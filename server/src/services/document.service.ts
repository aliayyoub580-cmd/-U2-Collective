import { supabaseAdmin } from '../config/supabase.js'
import { env } from '../config/env.js'
import { logger } from '../utils/logger.js'
import type { AuthUser } from '../types/index.js'

const BUCKET_MAP: Record<string, string> = {
  authorization: env.STORAGE_BUCKET_AUTH_DOCS,
  verification:  env.STORAGE_BUCKET_VER_DOCS,
  client:        env.STORAGE_BUCKET_CLIENT_DOCS,
  appeal:        env.STORAGE_BUCKET_APPEALS,
}

export const documentService = {

  async upload(
    file: Express.Multer.File,
    relatedType: string,
    relatedId: string,
    user: AuthUser,
    description?: string,
  ) {
    const bucket = BUCKET_MAP[relatedType] ?? env.STORAGE_BUCKET_CLIENT_DOCS
    const orgId = user.organization_id ?? 'global'
    const timestamp = Date.now()
    const safeFileName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')
    const storagePath = `${orgId}/${relatedType}/${relatedId}/${timestamp}_${safeFileName}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(storagePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      })

    if (uploadError) {
      logger.error('Storage upload failed', uploadError.message)
      throw new Error('File upload failed')
    }

    // Record in documents table
    const { data, error: dbError } = await supabaseAdmin
      .from('documents')
      .insert({
        organization_id: user.organization_id,
        uploaded_by:     user.id,
        category:        relatedType as never,
        file_name:       file.originalname,
        file_size:       file.size,
        mime_type:       file.mimetype,
        storage_path:    storagePath,
        bucket_name:     bucket,
        related_type:    relatedType,
        related_id:      relatedId,
        description,
      })
      .select()
      .single()

    if (dbError) throw new Error(dbError.message)
    return data
  },

  async getSignedUrl(documentId: string, user: AuthUser) {
    const { data: doc, error } = await supabaseAdmin
      .from('documents')
      .select('storage_path, bucket_name, organization_id, file_name')
      .eq('id', documentId)
      .eq('is_deleted', false)
      .single()

    if (error || !doc) throw new Error('Document not found')

    // Access control: client users can only access their org's documents
    const STAFF_ROLES = ['super_admin','admin','sub_admin','manager','verification_specialist','authorization_specialist']
    if (!STAFF_ROLES.includes(user.role) && doc.organization_id !== user.organization_id) {
      throw new Error('Access denied')
    }

    const expirySeconds = parseInt(env.STORAGE_SIGNED_URL_EXPIRY)
    const { data: signedData, error: signedError } = await supabaseAdmin.storage
      .from(doc.bucket_name)
      .createSignedUrl(doc.storage_path, expirySeconds)

    if (signedError) throw new Error('Could not generate download link')

    // Log access
    await supabaseAdmin.from('activity_logs').insert({
      user_id:     user.id,
      action:      'download_document',
      module:      'documents',
      record_id:   documentId,
      record_type: 'document',
      description: `Downloaded: ${doc.file_name}`,
    })

    return { url: signedData.signedUrl, expires_in: expirySeconds }
  },

  async listForRecord(relatedType: string, relatedId: string, user: AuthUser) {
    let q = supabaseAdmin
      .from('documents')
      .select('id, file_name, file_size, mime_type, description, created_at, profiles!uploaded_by(full_name)')
      .eq('related_type', relatedType)
      .eq('related_id', relatedId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })

    const STAFF_ROLES = ['super_admin','admin','sub_admin','manager','verification_specialist','authorization_specialist']
    if (!STAFF_ROLES.includes(user.role)) {
      q = q.eq('organization_id', user.organization_id!)
    }

    const { data, error } = await q
    if (error) throw new Error(error.message)
    return data ?? []
  },

  async softDelete(documentId: string, user: AuthUser) {
    const { error } = await supabaseAdmin
      .from('documents')
      .update({ is_deleted: true, deleted_at: new Date().toISOString(), updated_by: user.id } as never)
      .eq('id', documentId)

    if (error) throw new Error(error.message)
  },
}

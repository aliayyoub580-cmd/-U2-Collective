import { supabaseAdmin } from '../config/supabase.js'
import { logger } from '../utils/logger.js'

export type NotificationType =
  | 'status_change' | 'assignment' | 'additional_info'
  | 'approval' | 'denial' | 'expiration_warning'
  | 'overdue_task' | 'follow_up_reminder'

interface NotificationPayload {
  userId:      string
  type:        NotificationType
  title:       string
  body:        string
  relatedType?: string
  relatedId?:  string
}

export const notificationService = {

  async send(payload: NotificationPayload) {
    const { error } = await supabaseAdmin.from('notifications').insert({
      user_id:      payload.userId,
      type:         payload.type,
      title:        payload.title,
      body:         payload.body,
      related_type: payload.relatedType,
      related_id:   payload.relatedId,
    })
    if (error) logger.warn('Notification insert failed', error.message)
  },

  async sendMany(payloads: NotificationPayload[]) {
    if (payloads.length === 0) return
    const { error } = await supabaseAdmin.from('notifications').insert(
      payloads.map((p) => ({
        user_id:      p.userId,
        type:         p.type,
        title:        p.title,
        body:         p.body,
        related_type: p.relatedType,
        related_id:   p.relatedId,
      })),
    )
    if (error) logger.warn('Batch notification insert failed', error.message)
  },

  async markRead(notificationId: string, userId: string) {
    await supabaseAdmin
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .eq('user_id', userId)
  },

  async markAllRead(userId: string) {
    await supabaseAdmin
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false)
  },

  async listForUser(userId: string, page = 1, pageSize = 30) {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await supabaseAdmin
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw new Error(error.message)
    return { data: data ?? [], total: count ?? 0 }
  },

  // ── Templated notifications ──────────────────────────────────────────────

  async notifyStatusChange(
    userId: string,
    resourceType: 'verification' | 'authorization',
    resourceId: string,
    resourceRef: string,
    newStatus: string,
  ) {
    await notificationService.send({
      userId,
      type:        'status_change',
      title:       `${resourceType === 'verification' ? 'Verification' : 'Authorization'} Status Updated`,
      body:        `${resourceRef} status changed to: ${newStatus.replace(/_/g, ' ')}`,
      relatedType: resourceType,
      relatedId:   resourceId,
    })
  },

  async notifyAssignment(
    userId: string,
    resourceType: 'verification' | 'authorization',
    resourceId: string,
    resourceRef: string,
  ) {
    await notificationService.send({
      userId,
      type:        'assignment',
      title:       `New ${resourceType === 'verification' ? 'Verification' : 'Authorization'} Assigned`,
      body:        `${resourceRef} has been assigned to you.`,
      relatedType: resourceType,
      relatedId:   resourceId,
    })
  },

  async notifyApproval(userId: string, authId: string, patientRef: string, approvalNumber?: string) {
    await notificationService.send({
      userId,
      type:        'approval',
      title:       'Authorization Approved',
      body:        `Authorization for ${patientRef} has been approved.${approvalNumber ? ` Auth #${approvalNumber}` : ''}`,
      relatedType: 'authorization',
      relatedId:   authId,
    })
  },

  async notifyDenial(userId: string, authId: string, patientRef: string) {
    await notificationService.send({
      userId,
      type:        'denial',
      title:       'Authorization Denied',
      body:        `Authorization for ${patientRef} has been denied. Review for appeal options.`,
      relatedType: 'authorization',
      relatedId:   authId,
    })
  },
}

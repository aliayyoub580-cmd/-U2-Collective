import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { z } from 'zod'

// Resolve from this module instead of process.cwd(), so both `npm run dev`
// and the compiled server load server/.env regardless of where they are run.
const envPath = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '.env')

dotenv.config({ path: envPath })

const envSchema = z.object({
  PORT:                     z.string().default('4000'),
  NODE_ENV:                 z.enum(['development', 'production', 'test']).default('development'),
  CLIENT_URL:               z.string().default('http://localhost:5174'),
  SUPABASE_URL:             z.string().min(1, 'SUPABASE_URL is required'),
  SUPABASE_ANON_KEY:        z.string().min(1, 'SUPABASE_ANON_KEY is required'),
  SUPABASE_SERVICE_ROLE_KEY:z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
  JWT_SECRET:               z.string().min(16, 'JWT_SECRET must be at least 16 chars'),
  RESEND_API_KEY:           z.string().optional(),
  EMAIL_FROM:               z.string().default('noreply@u2collective.com'),
  STORAGE_SIGNED_URL_EXPIRY:z.string().default('3600'),
  STORAGE_BUCKET_AUTH_DOCS: z.string().default('authorization-documents'),
  STORAGE_BUCKET_VER_DOCS:  z.string().default('verification-documents'),
  STORAGE_BUCKET_CLIENT_DOCS:z.string().default('client-documents'),
  STORAGE_BUCKET_APPEALS:   z.string().default('appeal-documents'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:')
  console.error(parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = parsed.data
export const IS_DEV = env.NODE_ENV === 'development'

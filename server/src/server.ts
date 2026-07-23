import './config/env.js' // validate env first
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { env, IS_DEV } from './config/env.js'
import { logger } from './utils/logger.js'

// Routes
import authRoutes          from './routes/auth.routes.js'
import verificationRoutes  from './routes/verification.routes.js'
import authorizationRoutes from './routes/authorization.routes.js'
import userRoutes          from './routes/user.routes.js'
import notificationRoutes  from './routes/notification.routes.js'
import documentRoutes      from './routes/document.routes.js'
import dashboardRoutes     from './routes/dashboard.routes.js'
import taskRoutes          from './routes/task.routes.js'
import commentRoutes       from './routes/comment.routes.js'
import permissionRoutes    from './routes/permissions.routes.js'
import auditRoutes         from './routes/audit.routes.js'
import contentRoutes       from './routes/content.routes.js'

const app = express()

// ─── Security headers ─────────────────────────────────────────────────────────
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'"],
      styleSrc:   ["'self'", "'unsafe-inline'"],
      imgSrc:     ["'self'", 'data:', 'https:'],
    },
  },
}))

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: IS_DEV
    ? [env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:5174']
    : [env.CLIENT_URL],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// ─── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true, limit: '2mb' }))

// ─── Logging ──────────────────────────────────────────────────────────────────
app.use(morgan(IS_DEV ? 'dev' : 'combined'))

// ─── Global rate limiting ─────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max:      500,
  standardHeaders: true,
  legacyHeaders:   false,
  skip:            () => IS_DEV,
  message: { success: false, message: 'Too many requests, please try again later.' },
})

// Stricter limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      20,
  standardHeaders: true,
  legacyHeaders:   false,
  skip:            () => IS_DEV,
  message: { success: false, message: 'Too many authentication attempts. Please wait and try again.' },
})

app.use('/api/', globalLimiter)
app.use('/api/auth/login',          authLimiter)
app.use('/api/auth/register',       authLimiter)
app.use('/api/auth/reset-password', authLimiter)

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: env.NODE_ENV })
})

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth',           authRoutes)
app.use('/api/verifications',  verificationRoutes)
app.use('/api/authorizations', authorizationRoutes)
app.use('/api/users',          userRoutes)
app.use('/api/notifications',  notificationRoutes)
app.use('/api/documents',      documentRoutes)
app.use('/api/dashboard',      dashboardRoutes)
app.use('/api/tasks',          taskRoutes)
app.use('/api/comments',       commentRoutes)
app.use('/api/permissions',    permissionRoutes)
app.use('/api/audit-logs',     auditRoutes)
app.use('/api/content',        contentRoutes)

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Unhandled error', err)
  res.status(500).json({ success: false, message: IS_DEV ? err.message : 'Internal server error' })
})

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = parseInt(env.PORT)
app.listen(PORT, () => {
  logger.info(`🚀 U2 Collective API running on port ${PORT}`)
  logger.info(`   Environment: ${env.NODE_ENV}`)
  logger.info(`   Supabase:    ${env.SUPABASE_URL}`)
})

export default app

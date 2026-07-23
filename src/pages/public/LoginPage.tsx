import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { authService } from '@/services/auth.service'

const schema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})
type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const user = await authService.login(data.email, data.password)
      const isClient = ['client_admin', 'client_staff', 'readonly_client'].includes(user.role)
      navigate(isClient ? '/portal/dashboard' : '/admin/dashboard', { replace: true })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <>
      <Helmet>
        <title>Secure Login | U2 Collective</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-[calc(100vh-160px)] bg-[#F7F9FA] flex items-center justify-center p-6">
        <div className="w-full max-w-[420px]">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-[9px] bg-[#0B3D62] flex items-center justify-center">
                <span className="text-white font-bold text-sm">U2</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-[#0B3D62] text-[17px]">U2 Collective</div>
                <div className="text-[10px] text-[#5A6B78] uppercase tracking-widest">Client Portal</div>
              </div>
            </Link>
            <h1 className="text-[1.5rem] font-bold text-[#0B3D62] mb-1.5">Sign In</h1>
            <p className="text-[#5A6B78] text-[14px]">Access your verification and authorization dashboard</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-[#DCE5EA] shadow-sm p-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              <Input
                label="Email Address"
                type="email"
                required
                autoComplete="email"
                leftIcon={<Mail size={15} />}
                error={errors.email?.message}
                {...register('email')}
                placeholder="your@email.com"
              />
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                leftIcon={<Lock size={15} />}
                rightIcon={
                  <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
                error={errors.password?.message}
                {...register('password')}
                placeholder="••••••••"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#DCE5EA] text-[#1BA098] accent-[#1BA098]" />
                  <span className="text-[13px] text-[#5A6B78]">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-[13px] text-[#1BA098] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" size="lg" loading={isSubmitting} className="w-full justify-center">
                {isSubmitting ? 'Signing in…' : 'Sign In'}
              </Button>
            </form>

            {/* Security note */}
            <div className="mt-5 pt-5 border-t border-[#DCE5EA] flex items-start gap-2">
              <ShieldCheck size={14} className="text-[#1BA098] mt-0.5 shrink-0" />
              <p className="text-[12px] text-[#5A6B78] leading-relaxed">
                This portal uses secure, encrypted sessions. Designed to support HIPAA-aligned data handling.
              </p>
            </div>
          </div>

          {/* Footer links */}
          <div className="text-center mt-6 flex flex-col gap-2">
            <p className="text-[13px] text-[#5A6B78]">
              Not yet a client?{' '}
              <Link to="/contact" className="text-[#1BA098] hover:underline font-medium">Request access</Link>
            </p>
            <div className="flex items-center justify-center gap-4 text-[12px] text-[#9BAAB5]">
              <Link to="/privacy-policy" className="hover:text-[#5A6B78]">Privacy Policy</Link>
              <Link to="/hipaa-security" className="hover:text-[#5A6B78]">HIPAA & Security</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

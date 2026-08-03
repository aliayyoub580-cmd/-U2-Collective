import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Mail, Phone, Clock, MapPin, Send } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  organization: z.string().min(2, 'Practice or organization name is required'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service of interest'),
  specialty: z.string().optional(),
  message: z.string().min(10, 'Please provide a brief message (10+ characters)'),
})
type FormValues = z.infer<typeof schema>

const SERVICE_OPTIONS = [
  { value: '', label: 'Select service of interest' },
  { value: 'insurance-verification', label: 'Insurance Verification' },
  { value: 'prior-authorization', label: 'Prior Authorization' },
  { value: 'both', label: 'Both Services' },
  { value: 'billing-audit', label: 'Free Billing Audit' },
  { value: 'general', label: 'General Inquiry' },
]

const SPECIALTY_OPTIONS = [
  { value: '', label: 'Select your specialty (optional)' },
  { value: 'family-medicine', label: 'Family Medicine' },
  { value: 'internal-medicine', label: 'Internal Medicine' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'behavioral-health', label: 'Behavioral Health' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'pain-management', label: 'Pain Management' },
  { value: 'physical-therapy', label: 'Physical Therapy' },
  { value: 'radiology', label: 'Radiology' },
  { value: 'multi-specialty', label: 'Multi-Specialty Group' },
  { value: 'other', label: 'Other' },
]

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    // Placeholder — connect to backend in Phase 3
    await new Promise((r) => setTimeout(r, 1200))
    console.log('Contact form submission:', data)
    toast.success('Message received. A specialist will be in touch within one business day.')
    reset()
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | U2 Collective</title>
        <meta name="description" content="Contact U2 Collective to discuss insurance verification and prior authorization services for your practice. Request a free billing audit." />
        <link rel="canonical" href="https://u2collective.com/contact" />
      </Helmet>

      <div className="bg-[#EEF6F8] border-b border-[#DCE5EA]">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: 'Contact' }]} />
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#062A46] to-[#0B3D62] py-16">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
            className="text-[2.4rem] lg:text-[2.8rem] font-bold text-white leading-tight mb-4">
            Get in Touch
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}
            className="text-[#93BAD0] text-lg leading-[1.65]">
            Tell us about your practice and a specialist will follow up within one business day.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-[#F7F9FA]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-[1.25rem] font-bold text-[#0B3D62] mb-4">Contact Information</h2>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'info@u2collective.com' },
                    { icon: Phone, label: 'Phone', value: '(800) 000-0000' },
                    { icon: MapPin, label: 'Location', value: 'United States' },
                    { icon: Clock, label: 'Business Hours', value: 'Mon–Fri, 8am–6pm ET' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#EEF6F8] flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-[#1BA098]" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6B78]">{label}</div>
                        <div className="text-[14px] text-[#0B3D62] font-medium mt-0.5">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-xl bg-[#EEF6F8] border border-[#DCE5EA]">
                <h3 className="font-semibold text-[#0B3D62] text-[14px] mb-2">Free Billing Audit</h3>
                <p className="text-[#5A6B78] text-[13px] leading-[1.65]">
                  Request a complimentary review of your current verification and authorization process
                  to identify potential improvement areas.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-[#DCE5EA] p-8 shadow-sm">
              <h2 className="text-[1.25rem] font-bold text-[#0B3D62] mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Full Name" required error={errors.name?.message} {...register('name')} placeholder="Dr. Jane Smith" />
                  <Input label="Work Email" type="email" required error={errors.email?.message} {...register('email')} placeholder="jane@clinic.com" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Practice / Organization" required error={errors.organization?.message} {...register('organization')} placeholder="Family Medicine Group" />
                  <Input label="Phone Number" type="tel" error={errors.phone?.message} {...register('phone')} placeholder="(555) 000-0000" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Select label="Service of Interest" required options={SERVICE_OPTIONS} error={errors.service?.message} {...register('service')} />
                  <Select label="Practice Specialty" options={SPECIALTY_OPTIONS} {...register('specialty')} />
                </div>
                <Textarea
                  label="Message"
                  required
                  error={errors.message?.message}
                  {...register('message')}
                  placeholder="Tell us about your practice size, current challenges and what you're looking for..."
                  className="min-h-[120px]"
                />
                <div className="flex items-start gap-2 p-3 rounded-lg bg-[#EEF6F8] border border-[#DCE5EA]">
                  <p className="text-[12px] text-[#5A6B78] leading-relaxed">
                    By submitting this form you agree to our{' '}
                    <a href="/privacy-policy" className="text-[#1BA098] hover:underline">Privacy Policy</a>.
                    We do not share your information with third parties.
                  </p>
                </div>
                <Button type="submit" size="lg" loading={isSubmitting} className="w-full sm:w-auto sm:self-start">
                  <Send size={16} />
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

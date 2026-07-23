import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/public/HeroSection'
import PainPointsSection from '@/components/public/PainPointsSection'
import ServiceOverviewSection from '@/components/public/ServiceOverviewSection'
import HowItWorksSection from '@/components/public/HowItWorksSection'
import WhyChooseSection from '@/components/public/WhyChooseSection'
import TrustedPlatformsMarquee from '@/components/public/TrustedPlatformsMarquee'
import MetricsSection from '@/components/public/MetricsSection'
import DashboardPreviewSection from '@/components/public/DashboardPreviewSection'
import TestimonialsSection from '@/components/public/TestimonialsSection'
import SpecialtiesSection from '@/components/public/SpecialtiesSection'
import FAQSection from '@/components/public/FAQSection'
import FinalCTASection from '@/components/public/FinalCTASection'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Insurance Verification and Prior Authorization Services | U2 Collective</title>
        <meta
          name="description"
          content="Reduce preventable claim denials and administrative workload with professional insurance verification and prior authorization support from U2 Collective."
        />
        <meta property="og:title" content="Insurance Verification & Prior Authorization | U2 Collective" />
        <meta
          property="og:description"
          content="Expert eligibility verification and prior authorization management for physician practices and healthcare organizations."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://u2collective.com/" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'U2 Collective',
          description: 'Insurance Verification and Prior Authorization Services',
          url: 'https://u2collective.com',
          serviceType: 'Healthcare Revenue Cycle Management',
        })}</script>
      </Helmet>

      <HeroSection />
      <PainPointsSection />
      <ServiceOverviewSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <TrustedPlatformsMarquee />
      <MetricsSection />
      <DashboardPreviewSection />
      <TestimonialsSection />
      <SpecialtiesSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}

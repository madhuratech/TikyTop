import Hero from '../components/Hero'
import PricingSection from '../components/PricingSection'
import HowToOrder from '../components/HowToOrder'
import WhoBenefits from '../components/WhoBenefits'
import WhyChoose from '../components/WhyChoose'
import CTASection from '../components/CTASection'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'
import Search from '../components/search'
import Steps from '../components/Steps'
import WhyUSer from '../components/WhyUsers'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] min-h-screen">
      <Hero />
      <Steps/>
      <WhyChoose/>
      <WhoBenefits />
      <WhyUSer/>
      <CTASection />
      <FAQ />
      {/* <Search/> */}
      {/* <PricingSection /> */}
      {/* <HowToOrder /> */}
      {/* <WhyChoose /> */}
      <Testimonials />
    </div>
  )
}

import { LangProvider } from './context/LangContext'
import Nav from './components/Nav'
import LangToggle from './components/LangToggle'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
export default function App() {
  return (
    <LangProvider>
      <LangToggle />
      <Nav />
      <Hero />
      <Stats />
      <Services />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
      <WhatsAppFloat />
    </LangProvider>
  )
}

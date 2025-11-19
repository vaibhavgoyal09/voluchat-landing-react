import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PainPoints from '@/components/PainPoints';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import WaitlistForm from '@/components/WaitlistForm';
import SocialProof from '@/components/SocialProof';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PainPoints />
      <Features />
      <HowItWorks />
      <WaitlistForm />
      <SocialProof />
      <FAQ />
      <Footer />
    </main>
  );
}

/* eslint-disable no-unused-vars */
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-[#050a18] text-white overflow-hidden relative"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
}
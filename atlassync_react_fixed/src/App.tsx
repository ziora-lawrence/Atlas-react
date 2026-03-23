import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AIChatBox } from '@/components/AIChatBox';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { HowItWorks } from '@/sections/HowItWorks';
import { Portfolio } from '@/sections/Portfolio';
import { Testimonials } from '@/sections/Testimonials';
import { FAQ } from '@/sections/FAQ';
import { CTA } from '@/sections/CTA';
import './App.css';

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            const offset = 80; // Account for fixed navbar
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="relative min-h-screen bg-cyber-darker noise-overlay">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Services />
        <HowItWorks />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* AI Chat Box */}
      <AIChatBox />
    </div>
  );
}

export default App;

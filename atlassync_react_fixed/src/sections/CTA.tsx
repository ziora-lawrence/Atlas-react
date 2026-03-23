import { MessageCircle, Mail, MapPin, Phone, Zap } from 'lucide-react';
import { contactInfo } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function CTA() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-[5%] overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,201,200,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div
        ref={ref}
        className={`relative max-w-3xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
        }`}
      >
        <div className="glass-card border-cyber-border-hover rounded-3xl p-8 sm:p-12 text-center">
          <span className="section-label">Let's Talk</span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Sync Your
            <br />
            <span className="text-cyber-cyan">Business to the Future?</span>
          </h2>
          
          <p className="text-cyber-text-secondary max-w-md mx-auto mb-8 leading-relaxed">
            Drop us a message on WhatsApp or send an email — we typically reply within a few hours.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 
                       bg-cyber-green text-white font-bold rounded-lg 
                       transition-all duration-300 hover:shadow-green hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 
                       bg-transparent text-cyber-cyan font-bold rounded-lg 
                       border-2 border-cyber-border-hover transition-all duration-300 
                       hover:bg-cyber-cyan-dim hover:border-cyber-cyan hover:-translate-y-1"
            >
              <Mail className="w-5 h-5" />
              {contactInfo.email}
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 border-t border-cyber-border">
            <div className="flex items-center gap-2 text-sm text-cyber-text-secondary">
              <MapPin className="w-4 h-4 text-cyber-cyan" />
              <span>{contactInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-cyber-text-secondary">
              <Phone className="w-4 h-4 text-cyber-cyan" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-cyber-text-secondary">
              <Zap className="w-4 h-4 text-cyber-cyan" />
              <span>Fast replies guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

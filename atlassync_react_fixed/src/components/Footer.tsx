import { Globe, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { navLinks, contactInfo } from '@/data/content';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-cyber-card border-t border-cyber-border">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2 group">
              <Globe className="w-6 h-6 text-cyber-cyan transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-orbitron text-xl font-bold tracking-wide">
                <span className="text-cyber-text">Atlas</span>
                <span className="text-cyber-cyan">Sync</span>
              </span>
            </a>
            <p className="text-sm text-cyber-text-secondary leading-relaxed max-w-xs">
              We build AI automation and modern websites for businesses in Nigeria and beyond. 
              Syncing you to the future, one system at a time.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-cyber-darker border border-cyber-border 
                         flex items-center justify-center text-cyber-text-secondary
                         transition-all duration-300 hover:border-cyber-cyan hover:bg-cyber-cyan-dim 
                         hover:text-cyber-cyan hover:-translate-y-1"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="w-10 h-10 rounded-lg bg-cyber-darker border border-cyber-border 
                         flex items-center justify-center text-cyber-text-secondary
                         transition-all duration-300 hover:border-cyber-cyan hover:bg-cyber-cyan-dim 
                         hover:text-cyber-cyan hover:-translate-y-1"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-cyber-cyan mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-cyber-text-secondary hover:text-cyber-text transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-sm text-cyber-text-secondary hover:text-cyber-text transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-cyber-cyan mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-sm text-cyber-text-secondary hover:text-cyber-cyan transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-2 text-sm text-cyber-text-secondary hover:text-cyber-cyan transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-cyber-text-secondary hover:text-cyber-cyan transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Available
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-cyber-text-secondary">
                <MapPin className="w-4 h-4" />
                {contactInfo.location}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cyber-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-cyber-text-muted">
              © {currentYear} Atlas Sync. All rights reserved.
            </p>
            <p className="text-xs text-cyber-text-muted">
              Built by Atlas Sync ·{' '}
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-cyber-cyan transition-colors"
              >
                Contact Us
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

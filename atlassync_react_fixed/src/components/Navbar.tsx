import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { navLinks } from '@/data/content';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
        isScrolled
          ? 'bg-cyber-darker/90 backdrop-blur-2xl border-b border-cyber-border py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-[5%]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Globe className="w-6 h-6 text-cyber-cyan transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-orbitron text-xl font-bold tracking-wide">
              <span className="text-cyber-text">Atlas</span>
              <span className="text-cyber-cyan">Sync</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium text-cyber-text-secondary hover:text-cyber-cyan transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyber-cyan transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="px-5 py-2.5 bg-cyber-cyan text-cyber-darker text-sm font-bold rounded-lg 
                         transition-all duration-300 hover:shadow-neon hover:-translate-y-0.5"
              >
                Get Started →
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-cyber-text hover:text-cyber-cyan transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-[60px] bg-cyber-card/98 backdrop-blur-xl 
                   border-l border-cyber-border transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ left: 'auto', width: '80%', maxWidth: '300px' }}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="text-lg font-medium text-cyber-text hover:text-cyber-cyan transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="px-6 py-3 bg-cyber-cyan text-cyber-darker font-bold rounded-lg 
                       transition-all duration-300 hover:shadow-neon"
            >
              Get Started →
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}

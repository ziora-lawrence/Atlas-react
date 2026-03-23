import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, MapPin } from 'lucide-react';
import { stats } from '@/data/content';
import { useParticles } from '@/hooks/useParticles';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = 'Running Itself.';
  
  useParticles(canvasRef);

  useEffect(() => {
    const delay = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setDisplayedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 80);
      
      return () => clearInterval(interval);
    }, 800);
    
    return () => clearTimeout(delay);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial-gradient pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,201,200,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 bg-cyber-cyan-dim border border-cyber-border 
                     rounded-full px-4 py-2 mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
        >
          <span className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-blink" />
          <span className="text-xs font-semibold text-cyber-cyan tracking-widest uppercase">
            <MapPin className="w-3 h-3 inline mr-1" />
            Based in Ibadan, Nigeria
          </span>
        </div>

        {/* Headline */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: '250ms', animationFillMode: 'forwards' }}
        >
          Your Business.
          <br />
          <span className="text-cyber-cyan">
            {displayedText}
            {!isTypingComplete && (
              <span className="animate-blink">|</span>
            )}
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-base sm:text-lg text-cyber-text-secondary max-w-xl mx-auto mb-8 leading-relaxed opacity-0 animate-fade-up"
          style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
          Atlas Sync builds AI receptionists, chatbots, and modern websites for businesses 
          across Nigeria — so your systems work 24/7 even when you don't.
        </p>

        {/* Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-up"
          style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}
        >
          <a
            href="#contact"
            className="group px-8 py-4 bg-cyber-cyan text-cyber-darker font-bold rounded-lg 
                     transition-all duration-300 hover:shadow-neon hover:-translate-y-1 
                     flex items-center gap-2"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#portfolio"
            className="group px-8 py-4 bg-transparent text-cyber-cyan font-bold rounded-lg 
                     border-2 border-cyber-border-hover transition-all duration-300 
                     hover:bg-cyber-cyan-dim hover:border-cyber-cyan hover:-translate-y-1
                     flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            See Our Work
          </a>
        </div>

        {/* Stats */}
        <div 
          className="flex flex-wrap justify-center gap-8 sm:gap-12 pt-8 border-t border-cyber-border opacity-0 animate-fade-up"
          style={{ animationDelay: '750ms', animationFillMode: 'forwards' }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <span className="block text-2xl sm:text-3xl font-orbitron font-bold text-cyber-cyan mb-1">
                {stat.value}
              </span>
              <span className="text-xs text-cyber-text-secondary tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyber-darker to-transparent pointer-events-none" />
    </section>
  );
}

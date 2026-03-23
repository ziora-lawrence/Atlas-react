import { Phone, Palette, Rocket, TrendingUp } from 'lucide-react';
import { steps } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  Phone,
  Palette,
  Rocket,
  TrendingUp,
};

export function HowItWorks() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-[5%]">
      {/* Section Header */}
      <div
        ref={headerRef}
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
        }`}
      >
        <span className="section-label">The Process</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Up & Running
          <br />
          <span className="text-cyber-cyan">In Days, Not Months</span>
        </h2>
        <p className="text-cyber-text-secondary leading-relaxed">
          We keep it simple. No long contracts, no fluff — just results.
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon];
            const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

            return (
              <div
                key={step.id}
                ref={ref}
                className={`relative text-center transition-all duration-600 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Connector Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px border-t border-dashed border-cyber-border" />
                )}

                {/* Step Number */}
                <span className="inline-block text-xs font-orbitron font-bold text-cyber-cyan tracking-widest mb-4">
                  STEP {step.num}
                </span>

                {/* Icon */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 mx-auto rounded-full bg-cyber-card border-2 border-cyber-border-hover
                                flex items-center justify-center transition-all duration-300
                                hover:shadow-neon hover:scale-105 hover:border-cyber-cyan">
                    {Icon && <Icon className="w-7 h-7 text-cyber-cyan" />}
                  </div>
                  
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-cyber-cyan/20 animate-ping opacity-30" 
                       style={{ animationDuration: '2s' }} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-2 text-cyber-text">
                  {step.title}
                </h3>
                <p className="text-sm text-cyber-text-secondary leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mt-16 px-4">
        <div className="relative h-1 bg-cyber-card rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-cyber-cyan to-cyber-magenta rounded-full">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-cyber-cyan rounded-full shadow-neon" />
          </div>
        </div>
        <div className="flex justify-between mt-3 text-xs text-cyber-text-secondary">
          <span>Discovery</span>
          <span>Design</span>
          <span>Launch</span>
          <span>Growth</span>
        </div>
      </div>
    </section>
  );
}

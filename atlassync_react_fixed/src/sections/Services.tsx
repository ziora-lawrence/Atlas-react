import { Bot, MessageSquare, Globe, Zap, Check } from 'lucide-react';
import { services } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  Bot,
  MessageSquare,
  Globe,
  Zap,
};

export function Services() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="services"
      className="relative py-24 px-4 sm:px-6 lg:px-[5%]"
      style={{
        background: 'linear-gradient(180deg, #060912 0%, rgba(11,18,32,0.4) 50%, #060912 100%)',
      }}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
        }`}
      >
        <span className="section-label">What We Do</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Tools That Work
          <br />
          <span className="text-cyber-cyan">While You Sleep</span>
        </h2>
        <p className="text-cyber-text-secondary leading-relaxed">
          We build digital systems that run your business automatically — from customer 
          conversations to bookings and beyond.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
              threshold: 0.1,
              rootMargin: '0px 0px -50px 0px',
            });

            return (
              <div
                key={service.id}
                ref={ref}
                className={`group relative glass-card p-6 sm:p-8 transition-all duration-500 
                           hover:border-cyber-border-hover hover:shadow-card hover:-translate-y-1
                           ${index === 0 || index === 3 ? 'md:row-span-1' : ''}
                           ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Top Glow Line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Icon */}
                <div className="mb-5">
                  <div className="w-14 h-14 rounded-xl bg-cyber-cyan-dim border border-cyber-border 
                                flex items-center justify-center transition-all duration-300
                                group-hover:shadow-neon group-hover:scale-105">
                    {Icon && <Icon className="w-7 h-7 text-cyber-cyan" />}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-cyber-text group-hover:text-cyber-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="text-cyber-text-secondary text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-2 text-sm text-cyber-text-secondary"
                    >
                      <Check className="w-4 h-4 text-cyber-cyan flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="relative py-24 px-4 sm:px-6 lg:px-[5%]"
      style={{
        background: 'linear-gradient(180deg, #060912 0%, rgba(11,18,32,0.3) 100%)',
      }}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
        }`}
      >
        <span className="section-label">FAQ</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Common
          <span className="text-cyber-cyan"> Questions</span>
        </h2>
        <p className="text-cyber-text-secondary leading-relaxed">
          Everything you need to know before we get started.
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openId === faq.id;
          const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

          return (
            <div
              key={faq.id}
              ref={ref}
              className={`glass-card overflow-hidden transition-all duration-500
                         ${isOpen ? 'border-cyber-border-hover' : ''}
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-cyber-text text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border border-cyber-border-hover 
                            flex items-center justify-center text-cyber-cyan transition-all duration-300
                            ${isOpen ? 'rotate-180 bg-cyber-cyan-dim' : ''}`}
                >
                  {isOpen ? (
                    <Minus className="w-3 h-3" />
                  ) : (
                    <Plus className="w-3 h-3" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <p className="text-sm text-cyber-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Still Have Questions */}
      <div className="text-center mt-12">
        <p className="text-cyber-text-secondary mb-4">
          Still have questions?
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-cyber-cyan font-semibold 
                   hover:underline transition-all"
        >
          Let's talk →
        </a>
      </div>
    </section>
  );
}

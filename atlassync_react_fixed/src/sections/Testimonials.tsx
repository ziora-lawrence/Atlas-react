import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 lg:px-[5%]">
      {/* Section Header */}
      <div
        ref={headerRef}
        className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
        }`}
      >
        <span className="section-label">Client Love</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          What Business
          <br />
          <span className="text-cyber-cyan">Owners Are Saying</span>
        </h2>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Cards Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out gap-4"
              style={{ transform: `translateX(-${currentIndex * (100 / 2)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full md:w-1/2 flex-shrink-0 px-2"
                >
                  <div className="glass-card p-6 sm:p-8 h-full relative group hover:border-cyber-border-hover transition-all duration-300">
                    {/* Quote Icon */}
                    <Quote className="absolute top-4 right-4 w-10 h-10 text-cyber-cyan/10" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-cyber-text-secondary leading-relaxed mb-6 italic">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-cyber-border">
                      <div className="w-10 h-10 rounded-full bg-cyber-cyan-dim border border-cyber-border 
                                    flex items-center justify-center text-lg">
                        {testimonial.emoji}
                      </div>
                      <div>
                        <h4 className="font-bold text-cyber-text text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-cyber-cyan">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-11 h-11 rounded-full bg-cyber-card border border-cyber-border 
                       flex items-center justify-center text-cyber-cyan
                       transition-all duration-300 hover:bg-cyber-cyan hover:text-cyber-darker 
                       hover:border-cyber-cyan hover:shadow-neon"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 bg-cyber-cyan'
                      : 'w-2 bg-cyber-text-muted hover:bg-cyber-text-secondary'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-11 h-11 rounded-full bg-cyber-card border border-cyber-border 
                       flex items-center justify-center text-cyber-cyan
                       transition-all duration-300 hover:bg-cyber-cyan hover:text-cyber-darker 
                       hover:border-cyber-cyan hover:shadow-neon"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { ExternalLink, Code2, Eye } from 'lucide-react';
import { projects } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="portfolio"
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
        <span className="section-label">Portfolio</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Featured Work
          <br />
          <span className="text-cyber-cyan">Real Results</span>
        </h2>
        <p className="text-cyber-text-secondary leading-relaxed">
          Websites and systems we've built for clients across Nigeria and beyond.
        </p>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

            return (
              <div
                key={project.id}
                ref={ref}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer
                           transition-all duration-500 hover:shadow-card hover:-translate-y-2
                           ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Default Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker via-cyber-darker/50 to-transparent 
                              opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content - Always Visible */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block px-2 py-1 bg-cyber-cyan-dim border border-cyber-border 
                                 rounded text-xs font-bold text-cyber-cyan tracking-wider uppercase mb-2">
                    {project.tag}
                  </span>
                  <h3 className="text-lg font-bold text-cyber-text mb-1 group-hover:text-cyber-cyan transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-cyber-text-secondary line-clamp-2 group-hover:line-clamp-none transition-all">
                    {project.description}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 bg-cyber-darker/60 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-cyber-cyan text-cyber-darker 
                                     font-bold rounded-lg transition-all duration-300 hover:shadow-neon hover:scale-105">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 px-6 py-3 bg-transparent text-cyber-cyan 
                               font-bold rounded-lg border-2 border-cyber-cyan transition-all duration-300 
                               hover:bg-cyber-cyan hover:text-cyber-darker"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </div>
                </div>

                {/* Tech Stack Tags - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-wrap gap-2 justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                              translate-y-full group-hover:translate-y-0">
                  {project.techStack.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-2 py-1 bg-cyber-card/80 backdrop-blur-sm border border-cyber-border 
                               rounded text-xs text-cyber-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-cyber-card border-cyber-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-orbitron text-cyber-text">
              {selectedProject?.name}
            </DialogTitle>
            <DialogDescription className="text-cyber-text-secondary">
              {selectedProject?.tag}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <p className="text-cyber-text-secondary">
                {selectedProject.description}
              </p>
              
              <div>
                <h4 className="text-sm font-bold text-cyber-cyan mb-2 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-cyber-cyan-dim border border-cyber-border 
                               rounded-lg text-sm text-cyber-cyan font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-cyber-cyan 
                           text-cyber-darker font-bold rounded-lg transition-all duration-300 
                           hover:shadow-neon"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Live Site
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

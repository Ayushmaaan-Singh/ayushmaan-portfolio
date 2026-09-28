import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectsData from '../data/projects';
import ProjectDetails from './ProjectDetails';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index, onClick, isActive, isFaded }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const card = cardRef.current;
    if (!card) return;
    
    const img = card.querySelector('.project-image-wrapper img');
    const title = card.querySelector('.project-title');
    const btn = card.querySelector('.view-project-btn svg');

    const onEnter = () => {
      if (isActive || isFaded) return;
      gsap.to(card, { y: -8, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(img, { scale: 1.05, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(title, { color: 'var(--accent-primary)', duration: 0.25, overwrite: 'auto' });
      if (btn) gsap.to(btn, { x: 3, y: -3, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
    };

    const onLeave = () => {
      if (isActive || isFaded) return;
      gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.inOut', overwrite: 'auto' });
      gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' });
      gsap.to(title, { color: 'var(--text-primary)', duration: 0.25, overwrite: 'auto' });
      if (btn) gsap.to(btn, { x: 0, y: 0, duration: 0.25, ease: 'power2.inOut', overwrite: 'auto' });
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, [isActive, isFaded]);

  // Handle styles when active or faded during transition
  useEffect(() => {
    if (isActive) {
      gsap.to(cardRef.current, { scale: 1.02, zIndex: 10, duration: 0.4, ease: 'power3.out' });
    } else if (isFaded) {
      gsap.to(cardRef.current, { opacity: 0.3, scale: 0.95, filter: 'blur(4px)', duration: 0.4, ease: 'power3.out' });
    } else {
      gsap.to(cardRef.current, { opacity: 1, scale: 1, filter: 'blur(0px)', zIndex: 1, duration: 0.4, ease: 'power3.out' });
    }
  }, [isActive, isFaded]);

  return (
    <div
      className={`project-card card ${isActive ? 'active' : ''} ${isFaded ? 'faded' : ''}`}
      ref={cardRef}
      onClick={(e) => onClick(project, cardRef.current, e)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(project, cardRef.current, e)}
      aria-label={`Open details for ${project.title}`}
    >
      <div className="project-number">0{index + 1}</div>
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="project-overlay"></div>
      </div>
      <div className="project-content">
        <div className="project-category-badge">{project.category}</div>
        <h3 className="project-title">{project.title}</h3>
        {project.subtitle && (
          <p className="project-subtitle">{project.subtitle}</p>
        )}
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.technologies.map((tech, i) => (
            <React.Fragment key={tech}>
              <span className="tech-tag">{tech}</span>
              {i < project.technologies.length - 1 && (
                <span className="tech-separator">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
        {project.metric && (
          <div className="project-metric">
            <span className="metric-value">{project.metric.value}</span>
            <span className="metric-label">{project.metric.label}</span>
          </div>
        )}
        <button className="view-project-btn">
          View Project <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const cinematicBgRef = useRef(null);
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [transitionState, setTransitionState] = useState('idle'); // idle, animating_in, open, animating_out
  const [sourceRect, setSourceRect] = useState(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-header > *',
        { opacity: 0, y: prefersReduced ? 0 : 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );

      if (!prefersReduced) {
        gsap.fromTo(
          '.project-card',
          { opacity: 0, y: 56, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: { amount: 0.5 },
            ease: 'power3.out',
            scrollTrigger: { trigger: '.projects-grid', start: 'top 86%', once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleProjectClick = (project, cardElement, e) => {
    if (transitionState !== 'idle') return;
    
    // Get the exact position of the clicked image to start the transition
    const imgWrapper = cardElement.querySelector('.project-image-wrapper');
    const rect = imgWrapper.getBoundingClientRect();
    
    setSourceRect(rect);
    setSelectedProject(project);
    setTransitionState('animating_in');
    
    // Animate cinematic background
    gsap.to(cinematicBgRef.current, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.5,
      ease: 'power2.inOut'
    });
    
    // Hide navbar smoothly
    gsap.to('nav', { y: -100, opacity: 0, duration: 0.4 });
    
    // After animation finishes (handled in ProjectDetails), state becomes 'open'
  };

  const handleCloseProject = () => {
    setTransitionState('animating_out');
    
    // Remove cinematic background
    gsap.to(cinematicBgRef.current, {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.6,
      ease: 'power3.inOut',
      delay: 0.1
    });
    
    // Bring navbar back
    gsap.to('nav', { y: 0, opacity: 1, duration: 0.5, delay: 0.3 });
    
    // We clear selectedProject AFTER the exit animation completes
    setTimeout(() => {
      setSelectedProject(null);
      setTransitionState('idle');
      setSourceRect(null);
    }, 700);
  };
  
  const handleNavigate = (newProject, newCardRect) => {
    setSelectedProject(newProject);
    if (newCardRect) {
      setSourceRect(newCardRect);
    }
  };

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="cinematic-bg" ref={cinematicBgRef}></div>
      
      <div className="container">
        <div className="projects-header">
          <span className="section-label">FEATURED PROJECTS</span>
          <h2 className="section-title">Some of My Recent Work</h2>
        </div>

        <div className="projects-grid">
          {projectsData.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onClick={handleProjectClick}
              isActive={selectedProject?.id === project.id && transitionState !== 'idle'}
              isFaded={selectedProject && selectedProject.id !== project.id && transitionState !== 'idle'}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={handleCloseProject}
          sourceRect={sourceRect}
          transitionState={transitionState}
          onStateChange={setTransitionState}
          onNavigate={handleNavigate}
        />
      )}
    </section>
  );
};

export default Projects;

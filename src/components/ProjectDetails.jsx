import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, GitBranch, X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import projectsData from '../data/projects';
import './ProjectDetails.css';

const ProjectDetails = ({ project, onClose, sourceRect, transitionState, onStateChange, onNavigate }) => {
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    if (transitionState !== 'animating_in') return;

    // Center pop animation
    gsap.set(modalRef.current.querySelector('.project-modal'), {
      scale: 0.8,
      opacity: 0,
      y: 30
    });

    // Content starts hidden
    const contentElements = contentRef.current.querySelectorAll('.stagger-reveal');
    gsap.set(contentElements, { opacity: 0, y: 30, filter: 'blur(3px)' });
    gsap.set('.modal-close', { opacity: 0, scale: 0.8 });
    gsap.set('.modal-nav', { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        onStateChange('open');
      }
    });

    // Step 1: Modal pops in
    tl.to(modalRef.current.querySelector('.project-modal'), {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power4.out',
    });

    // Step 2: Content staggers in
    tl.to(
      contentElements,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=0.3'
    );

    // Step 3: UI elements fade in
    tl.to(
      ['.modal-close', '.modal-nav'],
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.4'
    );

    return () => tl.kill();
  }, [transitionState, onStateChange]);

  // Handle closing
  useEffect(() => {
    if (transitionState !== 'animating_out') return;

    const contentElements = contentRef.current.querySelectorAll('.stagger-reveal');

    const tl = gsap.timeline();

    // Fade out UI and content
    tl.to(['.modal-close', '.modal-nav'], { opacity: 0, duration: 0.2 });
    tl.to(
      contentElements,
      { opacity: 0, y: 20, duration: 0.3, stagger: 0.05, ease: 'power2.in' },
      0
    );

    // Shrink and fade modal
    tl.to(
      modalRef.current.querySelector('.project-modal'),
      {
        scale: 0.8,
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: 'power3.inOut',
      },
      0.1
    );

  }, [transitionState]);

  const currentIndex = projectsData.findIndex(p => p.id === project.id);
  const prevProject = projectsData[currentIndex - 1 >= 0 ? currentIndex - 1 : projectsData.length - 1];
  const nextProject = projectsData[currentIndex + 1 < projectsData.length ? currentIndex + 1 : 0];

  const handleNav = (targetProject, direction) => {
    // Cinematic slide transition between projects
    const currentImg = imageRef.current;
    const currentContent = contentRef.current.querySelectorAll('.stagger-reveal');
    
    const tl = gsap.timeline({
      onComplete: () => {
        onNavigate(targetProject);
        
        // Setup new elements
        gsap.set(currentImg, { x: direction === 'next' ? 100 : -100, opacity: 0, scale: 0.9 });
        gsap.set(currentContent, { y: 20, opacity: 0 });
        
        // Animate new elements in
        gsap.to(currentImg, { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' });
        gsap.to(currentContent, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' });
      }
    });

    tl.to(currentImg, {
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: 'power2.in'
    }, 0);
    
    tl.to(currentContent, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in'
    }, 0);
  };

  return (
    <div className="project-modal-container" ref={modalRef}>
      <div className="project-modal">
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={24} />
        </button>

        <div className="modal-scroll-area">
          <div className="modal-hero">
            <img 
              ref={imageRef}
              src={project.image} 
              alt={project.title} 
              className="modal-image"
            />
          </div>

          <div className="modal-content" ref={contentRef}>
            <div className="stagger-reveal project-modal-header">
              <span className="modal-project-number">PROJECT 0{projectsData.findIndex(p => p.id === project.id) + 1}</span>
              <h2 className="modal-title">{project.title}</h2>
              {project.subtitle && <p className="modal-subtitle">{project.subtitle}</p>}
            </div>

            <div className="stagger-reveal project-modal-meta">
              <div className="meta-item">
                <span className="meta-label">CATEGORY</span>
                <span className="meta-value">{project.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">YEAR</span>
                <span className="meta-value">{project.year}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">TECHNOLOGIES</span>
                <div className="modal-tech-tags">
                  {project.technologies.map(tech => (
                    <span key={tech} className="modal-tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="stagger-reveal modal-description">
              <p>{project.description}</p>
              
              {project.metric && (
                <div className="modal-metric">
                  <div className="modal-metric-value">{project.metric.value}</div>
                  <div className="modal-metric-label">{project.metric.label}</div>
                </div>
              )}
              
              <ul className="modal-details-list">
                {project.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="stagger-reveal modal-actions">
              {project.live && project.live !== "#" && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Live Project <ArrowUpRight size={18} />
                </a>
              )}
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                GitHub Repo <GitBranch size={18} />
              </a>
            </div>
            
            <div className="modal-nav">
              <button className="nav-btn prev" onClick={() => handleNav(prevProject, 'prev')}>
                <ChevronLeft size={20} />
                <span>PREVIOUS</span>
              </button>
              <button className="nav-btn next" onClick={() => handleNav(nextProject, 'next')}>
                <span>NEXT</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

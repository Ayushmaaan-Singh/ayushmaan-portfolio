import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Download, Code2 } from 'lucide-react';
import gsap from 'gsap';
import siteConfig from '../data/siteConfig';
import heroImage from '../assets/hero.jpeg';
import cvPdf from '../assets/Ayushmaan_Singh_Ez.pdf';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const imageRef = useRef(null);
  const codeCardRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        '.hero-content > *',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, delay: 0.15 }
      )
      .fromTo(
        '.hero-image-wrapper',
        { opacity: 0, scale: 0.93, x: 30 },
        { opacity: 1, scale: 1, x: 0, duration: 1 },
        '-=0.65'
      )
      .fromTo(
        '.code-card',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.45'
      );

      // Perpetual float — starts after intro finishes
      gsap.to('.code-card', {
        y: -14,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.3,
      });
    }, heroRef);

    // Subtle parallax effect
    const handleMouseMove = (e) => {
      if (prefersReduced) return;
      if (!visualRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position relative to center of screen (-1 to 1)
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;
      
      // Move image slightly
      gsap.to(imageRef.current, {
        x: xPos * -10,
        y: yPos * -10,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      
      // Move code card slightly more for parallax depth
      gsap.to(codeCardRef.current, {
        x: xPos * -15,
        // Y position handled by perpetual float animation, so we only animate X here to avoid fighting
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      <div className="gradient-bg"></div>

      <div className="container hero-container">
        {/* ── Left: text ── */}
        <div className="hero-content">
          <span className="section-label">{siteConfig.heroLabel}</span>

          <h1 className="hero-title">
            {siteConfig.heroHeading}{' '}
            <span className="text-gradient">{siteConfig.firstName}</span>
            <br />
            {siteConfig.heroTagline}
          </h1>

          <p className="hero-description">{siteConfig.heroDescription}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              View My Work <ArrowUpRight size={18} />
            </a>
            {/* Download PDF via Vite import */}
            <a href={cvPdf} className="btn-secondary" download="Ayushmaan_Singh_Ez.pdf">
              Download CV <Download size={18} />
            </a>
          </div>

          <div className="hero-technologies">
            <p>TECHNOLOGIES I WORK WITH</p>
            <div className="tech-icons">
              {siteConfig.heroTechnologies.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: visual ── */}
        <div className="hero-visual" ref={visualRef}>
          <div className="hero-image-wrapper" ref={imageRef}>
            <div className="image-glow"></div>
            <img
              src={heroImage}
              alt={`${siteConfig.name} — Developer`}
              className="hero-image"
            />

            <div className="code-card card" ref={codeCardRef}>
              <div className="code-header">
                <Code2 size={16} className="code-icon" />
                <span>developer.js</span>
                <div className="status-dot"></div>
              </div>
              <pre className="code-content">
                <code>
                  <span className="token-keyword">const</span>{' '}
                  <span className="token-variable">dev</span>{' '}
                  <span className="token-operator">=</span> {'{'}{'\n'}
                  {'  '}<span className="token-property">name</span>:{' '}
                  <span className="token-string">"{siteConfig.firstName}"</span>,{'\n'}
                  {'  '}<span className="token-property">focus</span>:{' '}
                  <span className="token-string">"Full Stack + AI"</span>,{'\n'}
                  {'  '}<span className="token-property">passion</span>:{' '}
                  <span className="token-string">"solving problems"</span>{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

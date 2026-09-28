import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import siteConfig from '../data/siteConfig';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const [showEducation, setShowEducation] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Left column reveals top-to-bottom
      gsap.fromTo(
        '.about-content > *',
        { opacity: 0, y: prefersReduced ? 0 : 44, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Stat cards staggered from left
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: prefersReduced ? 0 : 36, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: { amount: 0.4, from: 'start' },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 86%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleEducation = () => setShowEducation((prev) => !prev);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          {/* ── Left ── */}
          <div className="about-content">
            <span className="section-label">ABOUT ME</span>
            <h2 className="section-title">{siteConfig.aboutHeading}</h2>
            <p className="about-description">{siteConfig.aboutDescription}</p>

            <button className="about-link" onClick={toggleEducation}>
              {showEducation ? 'Hide Education' : 'Learn More About Me'}
              {showEducation ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showEducation && (
              <div className="education-section">
                {siteConfig.education.map((edu, i) => (
                  <div key={i} className="education-card">
                    <div className="edu-header">
                      <h4 className="edu-institution">{edu.institution}</h4>
                      <span className="edu-cgpa">CGPA: {edu.cgpa}</span>
                    </div>
                    <p className="edu-degree">{edu.degree}</p>
                    <p className="edu-duration">{edu.duration}</p>
                    <div className="edu-coursework">
                      {edu.coursework.map((c, ci) => (
                        <span key={ci} className="edu-tag">{c}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: stats ── */}
          <div className="about-stats">
            {siteConfig.aboutStats.map((stat, index) => (
              <div key={index} className="stat-card card">
                <div className="stat-title text-gradient">{stat.title}</div>
                <div className="stat-subtitle">{stat.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import siteConfig from '../data/siteConfig';
import './Approach.css';

gsap.registerPlugin(ScrollTrigger);

const Approach = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.approach-card',
        {
          opacity: 0,
          scale: prefersReduced ? 1 : 0.96,
          y: prefersReduced ? 0 : 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );

      gsap.fromTo(
        '.approach-quote',
        { opacity: 0, y: prefersReduced ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="approach" className="approach-section" ref={sectionRef}>
      <div className="container">
        <div className="approach-card card">
          <div className="approach-content">
            <span className="section-label">MY APPROACH</span>
            <h2 className="approach-quote">{siteConfig.approachQuote}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;

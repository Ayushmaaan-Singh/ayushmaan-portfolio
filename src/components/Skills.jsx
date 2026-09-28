import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import skillsData from '../data/skills';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Single skill badge — links to official docs ─── */
const SkillBadge = ({ item }) => (
  <a
    href={item.docs}
    target="_blank"
    rel="noopener noreferrer"
    className="skill-badge"
    title={`${item.name} documentation`}
    aria-label={`Open ${item.name} documentation`}
  >
    {item.name}
    <ExternalLink size={10} className="badge-ext-icon" aria-hidden="true" />
  </a>
);

/* ─── One skill category card ───────────────────── */
const SkillCard = ({ category }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const card   = cardRef.current;
    const badges = card.querySelectorAll('.skill-badge');

    const enterHandler = () => {
      gsap.to(badges, {
        y: -4,
        duration: 0.35,
        stagger: 0.04,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const leaveHandler = () => {
      gsap.to(badges, {
        y: 0,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
    };

    card.addEventListener('mouseenter', enterHandler);
    card.addEventListener('mouseleave', leaveHandler);

    return () => {
      card.removeEventListener('mouseenter', enterHandler);
      card.removeEventListener('mouseleave', leaveHandler);
    };
  }, []);

  return (
    <div className="skill-card" ref={cardRef}>
      <div className="skill-card-header">
        <span className="skill-card-icon" aria-hidden="true">{category.icon}</span>
        <h3 className="skill-card-title">{category.category}</h3>
      </div>
      <div className="skill-badges">
        {category.items.map((item) => (
          <SkillBadge key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
};

/* ─── Section ─────────────────────────────────── */
const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.skills-header > *',
        { opacity: 0, y: prefersReduced ? 0 : 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );

      // Cards reveal — staggered fade + lift + subtle scale
      if (!prefersReduced) {
        gsap.fromTo(
          '.skill-card',
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: { amount: 0.5, from: 'start' },
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.skills-grid',
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <div className="skills-header">
          <span className="section-label">MY SKILLS</span>
          <h2 className="section-title">Technologies I Work With</h2>
          <p className="skills-subtitle">
            A collection of technologies I use across software development,
            backend engineering, AI and data-driven projects.
            <br />
            <span className="skills-hint">Click any badge to open its official documentation.</span>
          </p>
        </div>

        <div className="skills-grid">
          {skillsData.map((category) => (
            <SkillCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

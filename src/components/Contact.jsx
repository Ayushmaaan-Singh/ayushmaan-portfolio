import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, GitBranch } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import siteConfig from '../data/siteConfig';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content > *',
        { opacity: 0, y: prefersReduced ? 0 : 36, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );

      gsap.fromTo(
        '.social-links-wrapper',
        { opacity: 0, x: prefersReduced ? 0 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );

      // Social link underline slide on hover (JS for better control)
      document.querySelectorAll('.social-link').forEach((link) => {
        const underline = link.querySelector('::after');
        link.addEventListener('mouseenter', () => {
          gsap.to(link, { color: 'var(--accent-primary)', duration: 0.2, overwrite: 'auto' });
        });
        link.addEventListener('mouseleave', () => {
          gsap.to(link, { color: 'var(--text-primary)', duration: 0.2, overwrite: 'auto' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      href: siteConfig.social.github,
      icon: <GitBranch size={18} />,
    },
    {
      name: 'LinkedIn',
      href: siteConfig.social.linkedin,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: 'LeetCode',
      href: siteConfig.social.leetcode,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-content">
            <span className="section-label">{siteConfig.contactLabel}</span>
            <h2 className="section-title">{siteConfig.contactHeading}</h2>
            <p className="contact-description">{siteConfig.contactDescription}</p>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ayushmaansingh8777@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary contact-btn"
            >
              Get In Touch <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="social-links-wrapper">
            <span className="social-label">FOLLOW ME</span>
            <div className="social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

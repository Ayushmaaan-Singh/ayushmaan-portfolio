/**
 * animations/scrollAnimations.js
 * ─────────────────────────────────────────────────────
 * Central GSAP animation registry.
 * Call initScrollAnimations() once after the DOM mounts.
 * Each section gets its own named timeline for clean cleanup.
 * ─────────────────────────────────────────────────────
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Shared easing tokens ─────────────────────────── */
const EASE_OUT  = 'power3.out';
const EASE_IN   = 'power2.in';
const EASE_EXPO = 'expo.out';

/* ─── Shared defaults ──────────────────────────────── */
const FROM_HIDDEN  = { opacity: 0, y: 40 };
const TO_VISIBLE   = { opacity: 1, y: 0 };

/**
 * Creates a ScrollTrigger reveal for any element selector.
 * @param {string} selector  CSS selector for elements to animate
 * @param {object} trigger   Element used as scroll trigger
 * @param {object} opts      Optional overrides
 */
function reveal(selector, trigger, opts = {}) {
  const els = gsap.utils.toArray(selector);
  if (!els.length) return null;

  return gsap.fromTo(
    els,
    { opacity: 0, y: opts.y ?? 40, scale: opts.scale ?? 1 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: opts.duration ?? 0.75,
      stagger: opts.stagger ?? 0.1,
      ease: opts.ease ?? EASE_OUT,
      scrollTrigger: {
        trigger,
        start: opts.start ?? 'top 82%',
        once: true,
        ...opts.scrollTrigger,
      },
    }
  );
}

/* ─── Page-load / Hero ─────────────────────────────── */
export function animateHero() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const tl = gsap.timeline({ defaults: { ease: EASE_EXPO } });

  tl.fromTo(
    '.hero-content > *',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, delay: 0.1 }
  )
  .fromTo(
    '.hero-image-wrapper',
    { opacity: 0, scale: 0.92, x: 30 },
    { opacity: 1, scale: 1, x: 0, duration: 1 },
    '-=0.6'
  )
  .fromTo(
    '.code-card',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.4'
  );

  // Perpetual float on the code card
  gsap.to('.code-card', {
    y: -14,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1.2,
  });

  return tl;
}

/* ─── About ────────────────────────────────────────── */
export function animateAbout(el) {
  if (!el) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  reveal('.about-content > *', el, { stagger: 0.12, y: prefersReduced ? 0 : 40 });
  reveal('.stat-card',         el, { stagger: 0.1,  y: prefersReduced ? 0 : 36, start: 'top 88%' });
}

/* ─── Skills ───────────────────────────────────────── */
export function animateSkills(el) {
  if (!el) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  reveal('.skills-header > *', el, { stagger: 0.1, y: prefersReduced ? 0 : 28 });
  reveal(
    '.skill-card',
    el,
    {
      stagger: 0.08,
      y: prefersReduced ? 0 : 38,
      scale: prefersReduced ? 1 : 0.97,
      start: 'top 88%',
    }
  );
}

/* ─── Projects ─────────────────────────────────────── */
export function animateProjects(el) {
  if (!el) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  reveal('.projects-header > *', el, { stagger: 0.1 });
  reveal(
    '.project-card',
    el,
    {
      stagger: 0.14,
      y: prefersReduced ? 0 : 50,
      start: 'top 88%',
    }
  );
}

/* ─── Approach ─────────────────────────────────────── */
export function animateApproach(el) {
  if (!el) return;
  gsap.fromTo(
    '.approach-card',
    { opacity: 0, scale: 0.97, y: 30 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.9,
      ease: EASE_OUT,
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    }
  );
}

/* ─── Contact ──────────────────────────────────────── */
export function animateContact(el) {
  if (!el) return;
  reveal('.contact-content > *', el, { stagger: 0.12 });
  reveal('.social-links-wrapper', el, { y: 30, start: 'top 88%' });
}

/* ─── Tech badges (Skills section) — staggered on hover ─ */
export function animateBadgesOnCardHover() {
  document.querySelectorAll('.skill-card').forEach((card) => {
    const badges = card.querySelectorAll('.skill-badge');

    card.addEventListener('mouseenter', () => {
      gsap.fromTo(
        badges,
        { y: 0 },
        {
          y: -3,
          duration: 0.3,
          stagger: 0.04,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      );
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(badges, {
        y: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
    });
  });
}

/* ─── Page transition overlay (route change feel) ───── */
export function pageTransitionIn() {
  return gsap.fromTo(
    'main',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT }
  );
}

import gsap from 'gsap';

// Initialize setup for GSAP if needed
export const initAnimations = () => {
  gsap.config({
    nullTargetWarn: false,
  });
};

export const animateFolderHover = (element, isHovering) => {
  if (!element) return;
  
  if (isHovering) {
    gsap.to(element, {
      z: 50,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
    });
  } else {
    gsap.to(element, {
      z: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }
};

export const openProjectAnimation = (
  folderRef,
  viewerRef,
  allFoldersRef,
  onComplete
) => {
  const tl = gsap.timeline({ onComplete });
  
  // 1. Move other folders back
  allFoldersRef.current.forEach((folder) => {
    if (folder !== folderRef.current) {
      gsap.to(folder, {
        z: -200,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
    }
  });

  // 2. Center and bring forward selected folder
  tl.to(folderRef.current, {
    x: 0,
    y: 0,
    z: 100,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    duration: 0.6,
    ease: "power3.inOut"
  });

  // 3. Fade in viewer and fade out folder simultaneously to simulate transformation
  tl.to(viewerRef.current, {
    autoAlpha: 1,
    duration: 0.4,
    ease: "power2.out"
  }, "-=0.2");
  
  tl.to(folderRef.current, {
    autoAlpha: 0,
    duration: 0.2
  }, "-=0.4");
  
  // 4. Animate Viewer Content
  const docElements = viewerRef.current.querySelectorAll('.doc-anim');
  tl.fromTo(docElements, 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: "power3.out" },
    "-=0.2"
  );
  
  return tl;
};

export const closeProjectAnimation = (
  folderRef,
  viewerRef,
  allFoldersRef,
  originalPositions,
  onComplete
) => {
  const tl = gsap.timeline({ onComplete });
  
  // 1. Fade out viewer content
  const docElements = viewerRef.current.querySelectorAll('.doc-anim');
  tl.to(docElements, {
    y: 10,
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
    stagger: -0.02
  });
  
  // 2. Fade out viewer and fade in folder
  tl.to(viewerRef.current, {
    autoAlpha: 0,
    duration: 0.4,
    ease: "power2.inOut"
  });
  
  tl.to(folderRef.current, {
    autoAlpha: 1,
    duration: 0.2
  }, "-=0.3");

  // 3. Return folder to original position
  const id = folderRef.current.dataset.id;
  const originalPos = originalPositions.find(p => p.id === parseInt(id));
  
  if (originalPos) {
    tl.to(folderRef.current, {
      x: originalPos.x,
      y: originalPos.y,
      z: originalPos.z,
      rotateX: originalPos.rotateX,
      rotateY: originalPos.rotateY,
      rotateZ: originalPos.rotateZ,
      duration: 0.6,
      ease: "power3.inOut"
    }, "-=0.2");
  }

  // 4. Bring other folders back
  tl.add(() => {
    allFoldersRef.current.forEach((folder) => {
      if (folder !== folderRef.current) {
        gsap.to(folder, {
          z: (idx) => {
            const pid = parseInt(folder.dataset.id);
            const orig = originalPositions.find(p => p.id === pid);
            return orig ? orig.z : 0;
          },
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    });
  }, "-=0.4");
  
  return tl;
};

export const transitionProjectAnimation = (
  viewerRef,
  direction,
  onComplete
) => {
  const tl = gsap.timeline({ onComplete });
  const docElements = viewerRef.current.querySelectorAll('.doc-anim');
  
  // Slide out
  tl.to(docElements, {
    x: direction === 'next' ? -50 : 50,
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
    stagger: 0.02
  });
  
  // Reset position for slide in
  tl.set(docElements, {
    x: direction === 'next' ? 50 : -50
  });
  
  // Slide in (this part is meant to be called after content updates, 
  // so we'll just handle the 'out' part here and let a separate function handle the 'in' part,
  // or handle the 'in' part within the component effect)
  return tl;
};

export const animateProjectIn = (viewerRef) => {
  const docElements = viewerRef.current.querySelectorAll('.doc-anim');
  gsap.fromTo(docElements,
    { x: (i, el) => el.dataset.dir === 'next' ? 50 : -50, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.05 }
  );
};

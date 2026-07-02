/**
 * Utilidades para animaciones Motion (inView)
 * Animaciones profesionales y suaves que se ejecutan cada vez que el elemento entra en viewport
 */

import { inView, animate, stagger } from 'motion';

export interface MotionOptions {
  threshold?: number;
  duration?: number;
  delay?: number;
}

// Easing profesional para transiciones suaves
const smoothEasing = [0.25, 0.1, 0.25, 1]; // cubic-bezier
const ENABLE_EXIT_ANIMATIONS = false;

function getMotionElements(selector: string, motionKey: string) {
  const attributeName = `data-motion-${motionKey}-bound`;

  return Array.from(document.querySelectorAll(selector)).filter((el) => {
    const element = el as HTMLElement;

    if (element.hasAttribute(attributeName)) {
      return false;
    }

    element.setAttribute(attributeName, 'true');
    return true;
  });
}

function shouldAnimateOnce(el: Element) {
  return (el as HTMLElement).hasAttribute('data-animate-once');
}

function hasPlayedMotion(el: Element, motionKey: string) {
  return (el as HTMLElement).hasAttribute(`data-motion-${motionKey}-played`);
}

function markMotionAsPlayed(el: Element, motionKey: string) {
  (el as HTMLElement).setAttribute(`data-motion-${motionKey}-played`, 'true');
}

/**
 * Inicializa animaciones fade up para elementos con data-animate
 * Se ejecuta cada vez que el elemento entra en el viewport
 */
export function initFadeUp(selector = '[data-animate="fade-up"]', options: MotionOptions = {}) {
  const {
    threshold = 0.35,
    duration = 0.9,
    delay = 0,
  } = options;

  const elements = getMotionElements(selector, 'fade-up');
  
  elements.forEach((el) => {
    inView(
      el,
      () => {
        const animateOnce = shouldAnimateOnce(el);

        if (animateOnce && hasPlayedMotion(el, 'fade-up')) {
          return;
        }

        if (animateOnce) {
          markMotionAsPlayed(el, 'fade-up');
        }

        animate(
          el as HTMLElement,
          { opacity: [0, 1], y: [30, 0] } as any,
          { duration, delay, easing: smoothEasing } as any
        );

        if (animateOnce) {
          return;
        }

        if (!ENABLE_EXIT_ANIMATIONS) {
          return;
        }
        
        return () => {
          animate(
            el as HTMLElement,
            { opacity: [1, 0], y: [0, -20] } as any,
            { duration: 0.4, easing: smoothEasing } as any
          );
        };
      },
      { amount: threshold }
    );
  });
}

/**
 * Inicializa animaciones fade in para elementos con data-animate
 */
export function initFadeIn(selector = '[data-animate="fade-in"]', options: MotionOptions = {}) {
  const {
    threshold = 0.3,
    duration = 1.0,
    delay = 0,
  } = options;

  const elements = getMotionElements(selector, 'fade-in');
  
  elements.forEach((el) => {
    inView(
      el,
      () => {
        const animateOnce = shouldAnimateOnce(el);

        if (animateOnce && hasPlayedMotion(el, 'fade-in')) {
          return;
        }

        if (animateOnce) {
          markMotionAsPlayed(el, 'fade-in');
        }

        animate(
          el as HTMLElement,
          { opacity: [0, 1] } as any,
          { duration, delay, easing: smoothEasing } as any
        );

        if (animateOnce) {
          return;
        }

        if (!ENABLE_EXIT_ANIMATIONS) {
          return;
        }
        
        return () => {
          animate(
            el as HTMLElement,
            { opacity: [1, 0] } as any,
            { duration: 0.4, easing: smoothEasing } as any
          );
        };
      },
      { amount: threshold }
    );
  });
}

/**
 * Inicializa animaciones stagger para grupos de elementos
 * Los hijos directos se animan secuencialmente
 */
export function initStagger(selector = '[data-animate="stagger"]', options: MotionOptions = {}) {
  const {
    threshold = 0.25,
    duration = 0.7,
  } = options;

  const containers = getMotionElements(selector, 'stagger');
  
  containers.forEach((container) => {
    const children = Array.from(container.children);
    
    inView(
      container,
      () => {
        animate(
          children as HTMLElement[],
          { opacity: [0, 1], y: [20, 0] } as any,
          {
            duration,
            delay: stagger(0.08),
            easing: smoothEasing,
          } as any
        );

        if (!ENABLE_EXIT_ANIMATIONS) {
          return;
        }
        
        return () => {
          animate(
            children as HTMLElement[],
            { opacity: [1, 0], y: [0, -15] } as any,
            {
              duration: 0.3,
              delay: stagger(0.03),
              easing: smoothEasing,
            } as any
          );
        };
      },
      { amount: threshold }
    );
  });
}

/**
 * Inicializa animaciones slide desde la izquierda
 */
export function initSlideLeft(selector = '[data-animate="slide-left"]', options: MotionOptions = {}) {
  const {
    threshold = 0.35,
    duration = 0.9,
    delay = 0,
  } = options;

  const elements = getMotionElements(selector, 'slide-left');
  
  elements.forEach((el) => {
    inView(
      el,
      () => {
        animate(
          el as HTMLElement,
          { opacity: [0, 1], x: [-40, 0] } as any,
          { duration, delay, easing: smoothEasing } as any
        );

        if (!ENABLE_EXIT_ANIMATIONS) {
          return;
        }
        
        return () => {
          animate(
            el as HTMLElement,
            { opacity: [1, 0], x: [0, -30] } as any,
            { duration: 0.4, easing: smoothEasing } as any
          );
        };
      },
      { amount: threshold }
    );
  });
}

/**
 * Inicializa animaciones slide desde la derecha
 */
export function initSlideRight(selector = '[data-animate="slide-right"]', options: MotionOptions = {}) {
  const {
    threshold = 0.35,
    duration = 0.9,
    delay = 0,
  } = options;

  const elements = getMotionElements(selector, 'slide-right');
  
  elements.forEach((el) => {
    inView(
      el,
      () => {
        animate(
          el as HTMLElement,
          { opacity: [0, 1], x: [40, 0] } as any,
          { duration, delay, easing: smoothEasing } as any
        );

        if (!ENABLE_EXIT_ANIMATIONS) {
          return;
        }
        
        return () => {
          animate(
            el as HTMLElement,
            { opacity: [1, 0], x: [0, 30] } as any,
            { duration: 0.4, easing: smoothEasing } as any
          );
        };
      },
      { amount: threshold }
    );
  });
}

/**
 * Inicializa animación scale (zoom in)
 */
export function initScale(selector = '[data-animate="scale"]', options: MotionOptions = {}) {
  const {
    threshold = 0.4,
    duration = 0.8,
    delay = 0,
  } = options;

  const elements = getMotionElements(selector, 'scale');
  
  elements.forEach((el) => {
    inView(
      el,
      () => {
        const animateOnce = shouldAnimateOnce(el);

        if (animateOnce && hasPlayedMotion(el, 'scale')) {
          return;
        }

        if (animateOnce) {
          markMotionAsPlayed(el, 'scale');
        }

        animate(
          el as HTMLElement,
          { opacity: [0, 1], scale: [0.9, 1] } as any,
          { duration, delay, easing: smoothEasing } as any
        );

        if (animateOnce) {
          return;
        }

        if (!ENABLE_EXIT_ANIMATIONS) {
          return;
        }
        
        return () => {
          animate(
            el as HTMLElement,
            { opacity: [1, 0], scale: [1, 0.95] } as any,
            { duration: 0.4, easing: smoothEasing } as any
          );
        };
      },
      { amount: threshold }
    );
  });
}

/**
 * Inicializa animaciones fade down para elementos con data-animate
 */
export function initFadeDown(selector = '[data-animate="fade-down"]', options: MotionOptions = {}) {
  const {
    threshold = 0.35,
    duration = 0.9,
    delay = 0,
  } = options;

  const elements = getMotionElements(selector, 'fade-down');
  
  elements.forEach((el) => {
    inView(
      el,
      () => {
        animate(
          el as HTMLElement,
          { opacity: [0, 1], y: [-30, 0] } as any,
          { duration, delay, easing: smoothEasing } as any
        );

        if (!ENABLE_EXIT_ANIMATIONS) {
          return;
        }
        
        return () => {
          animate(
            el as HTMLElement,
            { opacity: [1, 0], y: [0, 20] } as any,
            { duration: 0.4, easing: smoothEasing } as any
          );
        };
      },
      { amount: threshold }
    );
  });
}

/**
 * Inicializa animaciones slide up para elementos con data-animate
 */
export function initSlideUp(selector = '[data-animate="slide-up"]', options: MotionOptions = {}) {
  const {
    threshold = 0.35,
    duration = 0.9,
    delay = 0,
  } = options;

  const elements = getMotionElements(selector, 'slide-up');
  
  elements.forEach((el) => {
    inView(
      el,
      () => {
        animate(
          el as HTMLElement,
          { opacity: [0, 1], y: [40, 0] } as any,
          { duration, delay, easing: smoothEasing } as any
        );

        if (!ENABLE_EXIT_ANIMATIONS) {
          return;
        }
        
        return () => {
          animate(
            el as HTMLElement,
            { opacity: [1, 0], y: [0, -30] } as any,
            { duration: 0.4, easing: smoothEasing } as any
          );
        };
      },
      { amount: threshold }
    );
  });
}

/**
 * Inicializa animaciones slide down para elementos con data-animate
 */
export function initSlideDown(selector = '[data-animate="slide-down"]', options: MotionOptions = {}) {
  const {
    threshold = 0.35,
    duration = 0.9,
    delay = 0,
  } = options;

  const elements = getMotionElements(selector, 'slide-down');
  
  elements.forEach((el) => {
    inView(
      el,
      () => {
        animate(
          el as HTMLElement,
          { opacity: [0, 1], y: [-40, 0] } as any,
          { duration, delay, easing: smoothEasing } as any
        );

        if (!ENABLE_EXIT_ANIMATIONS) {
          return;
        }
        
        return () => {
          animate(
            el as HTMLElement,
            { opacity: [1, 0], y: [0, 30] } as any,
            { duration: 0.4, easing: smoothEasing } as any
          );
        };
      },
      { amount: threshold }
    );
  });
}

/**
 * Función principal que inicializa todas las animaciones
 */
export function initAllMotions() {
  initFadeUp();
  initFadeIn();
  initFadeDown();
  initStagger();
  initSlideLeft();
  initSlideRight();
  initSlideUp();
  initSlideDown();
  initScale();
}

// Hacer disponible globalmente para las transiciones de página
if (typeof window !== 'undefined') {
  (window as any).initAllMotions = initAllMotions;
}

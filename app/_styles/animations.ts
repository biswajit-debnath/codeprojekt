// Animation variants for Framer Motion
export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay: number = 0) => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.8,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number = 0, duration: number = 0.5) => {
  return {
    hidden: {
      y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
      x: direction === 'left' ? '100%' : direction === 'right' ? '-100%' : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

export const textVariant = (delay: number = 0) => {
  return {
    hidden: {
      y: 20,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.6,
        delay,
        ease: 'easeOut',
      },
    },
  };
};

export const cardHover = {
  rest: { scale: 1, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
  hover: {
    scale: 1.03,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    }
  },
};

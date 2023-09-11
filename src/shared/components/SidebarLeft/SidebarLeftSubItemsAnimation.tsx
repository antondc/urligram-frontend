import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { EASE_OUT_QUART_CUSTOM } from 'Root/src/shared/constants';

const variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  shown: {
    height: 'auto',
    opacity: 1,
    transition: {
      opacity: {
        delay: 0.07,
        ease: EASE_OUT_QUART_CUSTOM,
        duration: 0.15,
      },
      height: {
        ease: EASE_OUT_QUART_CUSTOM,
        duration: 0.15,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      opacity: {
        ease: EASE_OUT_QUART_CUSTOM,
        duration: 0.15,
      },
      height: {
        delay: 0.07,
        ease: EASE_OUT_QUART_CUSTOM,
        duration: 0.15,
      },
    },
  },
};

interface Props {
  children: React.ReactNode | React.ReactNode[];
  mounted?: boolean;
}

export const SidebarLeftSubItemsAnimation: React.FC<Props> = ({ children, mounted }) => (
  <AnimatePresence>
    {mounted && (
      <motion.div initial="hidden" animate="shown" exit="exit" variants={variants}>
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

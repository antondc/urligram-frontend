import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { speedMap } from './speedMap';

import './AnimateHeight.less';

export type FadeSpeed = 'slow' | 'normal' | 'fast' | 'fastest';

interface Props {
  className?: string;
  mounted?: boolean;
  ease?: number[] | string;
  mountedHeight?: number;
  unmountedHeight?: number | string;
  delayIn?: number;
  delayOut?: number;
  speed?: FadeSpeed;
  onExitComplete?: () => void;
}

export const AnimateHeight: React.FC<Props> = ({
  children,
  className,
  mounted = true,
  ease = [0, 0, 0.55, 1],
  mountedHeight = 'auto',
  unmountedHeight = 0,
  delayIn = 0,
  delayOut = 0,
  speed = 'fast',
  onExitComplete,
}) => (
  <AnimatePresence onExitComplete={onExitComplete}>
    {mounted && (
      <motion.div
        initial="hidden"
        animate="shown"
        exit="exit"
        variants={{
          hidden: {
            height: unmountedHeight,
            transition: {
              ease,
              delay: delayIn,
              duration: speedMap[speed],
            },
          },
          shown: {
            height: mountedHeight,
            transition: {
              ease,
              delay: delayIn,
              duration: speedMap[speed],
            },
          },
          exit: {
            height: unmountedHeight,
            transition: {
              ease,
              delay: delayOut,
              duration: speedMap[speed],
            },
          },

        }}
        className={'AnimateHeight' + (className ? ` ${className}` : '')}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

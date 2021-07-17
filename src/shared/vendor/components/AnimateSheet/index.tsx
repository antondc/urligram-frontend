import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { speedMap } from './speedMap';

import './AnimateSheet.less';

export type FadeSpeed = 'slow' | 'normal' | 'fast' | 'fastest';

interface Props {
  className?: string;
  mounted: boolean;
  ease?: number[] | string;
  mountedTop?: number | string;
  unmountedTop?: number | string;
  delayIn?: number;
  delayOut?: number;
  speed?: FadeSpeed;
  onExitComplete?: () => void;
}

export const AnimateSheet: React.FC<Props> = ({
  children,
  className,
  mounted,
  ease = [0, 0, 0.55, 1],
  mountedTop = '10vh',
  unmountedTop = '100vh',
  delayIn = 0,
  delayOut = 0,
  speed = 'normal',
  onExitComplete,
}) => (
  <AnimatePresence onExitComplete={onExitComplete}>
    {mounted && (
      <div className={className ? ` ${className}` : ''}>
        <motion.div
          initial="hidden"
          animate="shown"
          exit="exit"
          variants={{
            hidden: {
              opacity: 0,
              transition: {
                ease,
                delay: delayIn,
                duration: speedMap[speed],
              },
            },
            shown: {
              opacity: 1,
              transition: {
                ease,
                delay: delayIn,
                duration: speedMap[speed],
              },
            },
            exit: {
              opacity: 0,
              transition: {
                ease,
                delay: delayOut,
                duration: speedMap[speed],
              },
            },
          }}
          className="AnimateSheet-layover"
        >
          <div />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="shown"
          exit="exit"
          variants={{
            hidden: {
              top: unmountedTop,
              transition: {
                ease,
                delay: delayIn,
                duration: speedMap[speed],
              },
            },
            shown: {
              top: mountedTop,
              transition: {
                ease,
                delay: delayIn,
                duration: speedMap[speed],
              },
            },
            exit: {
              top: unmountedTop,
              transition: {
                ease,
                delay: delayOut,
                duration: speedMap[speed],
              },
            },
          }}
          className={'AnimateSheet'}
        >
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

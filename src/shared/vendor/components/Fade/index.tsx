import React, { HTMLProps } from 'react';
import { CSSTransition } from 'react-transition-group';

import { speedMap } from './speedMap';

import './Fade.less';

export type FadeSpeed = 'slow' | 'normal' | 'fast' | 'fastest';

interface Props extends HTMLProps<HTMLDivElement> {
  className?: string;
  mounted?: boolean;
  disabled?: boolean;
  unmountOnExit?: boolean;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  speed?: FadeSpeed;
  direction?: 'left' | 'up' | 'right' | 'down';
  delayIn?: number;
  delayOut?: number;
  easing?: string;
  position?: 'fixed' | 'absolute';
  appear?: boolean;
}

export const Fade: React.FC<Props> = ({
  className,
  disabled,
  onEnter,
  onExited,
  children,
  onExit,
  onEntered,
  mounted,
  unmountOnExit = true,
  speed = 'fast',
  delayIn = 0,
  delayOut = 0,
  direction,
  easing = 'cubic-bezier(0.5, 1, 0.89, 1)',
  position,
  appear = false,
  ...props
}) => {
  const cssDelay = mounted === true ? delayIn : delayOut;
  const delayRule = cssDelay.toString() + 'ms';

  return (
    <CSSTransition
      in={mounted}
      appear={appear}
      unmountOnExit={unmountOnExit}
      className={
        (className ? className : ' ') +
        ' Fade ' +
        (' Fade--' + speed) +
        (position ? ' Fade--' + position : ' ') +
        (direction ? ' Fade--' + direction : ' ') +
        (disabled ? ' Fade-enter-done' : ' ')
      }
      classNames={'Fade'}
      timeout={{
        enter: speedMap[speed],
        exit: speedMap[speed] + delayOut,
      }}
      onExit={onExit}
      onExited={onExited}
      onEnter={onEnter}
      onEntered={onEntered}
    >
      <div style={{ transitionDelay: delayRule, transitionTimingFunction: easing }} {...props}>
        {children}
      </div>
    </CSSTransition>
  );
};

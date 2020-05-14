import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { speedMap } from './speedMap';

import './Fade.less';

export type FadeSpeed = 'slow' | 'normal' | 'fast' | 'fastest';

interface Props {
  classname?: string;
  mounted?: boolean;
  unmountOnExit?: boolean;
  children?: object;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  speed?: FadeSpeed;
  direction?: 'left' | 'up' | 'right' | 'down';
  delayIn?: number;
  delayOut?: number;
  easing?: string;
  fullScreen?: boolean;
}

const Fade: React.FC<Props> = ({
  classname,
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
  fullScreen,
}) => {
  const cssDelay = mounted === true ? delayIn : delayOut;
  const delayRule = cssDelay.toString() + 'ms';

  return (
    <CSSTransition
      in={mounted}
      appear
      unmountOnExit={unmountOnExit}
      className={
        (classname ? classname : ' ') +
        ' Fade ' +
        (' Fade--' + speed) +
        (fullScreen ? ' Fade--fullScreen' : ' ') +
        (direction ? ' Fade--' + direction : ' ')
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
      <div style={{ transitionDelay: delayRule, transitionTimingFunction: easing }}>{children}</div>
    </CSSTransition>
  );
};

export default Fade;

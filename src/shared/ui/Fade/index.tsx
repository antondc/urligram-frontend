import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { speedMap } from './speedMap';
import './Fade.less';

export type FadeSpeed = 'slow' | 'normal' | 'fast' | 'fastest';

interface Props {
  classname?: string;
  mounted?: boolean;
  children?: object;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  speed?: FadeSpeed;
}

const Fade: React.FC<Props> = ({
  classname,
  onEnter,
  onExited,
  children,
  onExit,
  onEntered,
  mounted,
  speed = 'fast',
}) => {
  return (
    <div className={'Fade ' + (classname || '') + (' Fade-' + speed)}>
      <CSSTransition
        in={mounted}
        appear
        unmountOnExit
        className={'Fade-transition Fade-transition--' + speed + (classname ? classname + '-transition' : '')}
        classNames={'Fade'}
        timeout={{
          enter: speedMap[speed],
          exit: speedMap[speed],
        }}
        onExit={onExit}
        onExited={onExited}
        onEnter={onEnter}
        onEntered={onEntered}
      >
        <div className="Fade-initial">{children}</div>
      </CSSTransition>
    </div>
  );
};

export default Fade;

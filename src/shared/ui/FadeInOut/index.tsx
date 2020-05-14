import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { speedMap } from './speedMap';

import './FadeInOut.less';

export type FadeSpeed = 'slow' | 'normal' | 'fast' | 'fastest';

interface Props {
  classname?: string;
  children: React.ReactNode | React.ReactNode[];
  valueToUpdate: string;
  speed?: FadeSpeed;
  scrollToTop?: boolean;
}

const FadeInOut: React.FC<Props> = ({ children, classname, valueToUpdate, speed = 'normal', scrollToTop }) => (
  <TransitionGroup component={null}>
    <CSSTransition
      key={valueToUpdate}
      appear
      unmountOnExit
      classNames="FadeInOut"
      className={'FadeInOut-transition FadeInOut-transition--' + speed + (classname ? classname + '-transition' : '')}
      timeout={{
        enter: speedMap[speed],
        exit: speedMap[speed],
      }}
      onExited={() => {
        scrollToTop &&
          window.scrollTo({
            top: 0,
          });
      }}
    >
      <div>{children}</div>
    </CSSTransition>
  </TransitionGroup>
);

export default FadeInOut;

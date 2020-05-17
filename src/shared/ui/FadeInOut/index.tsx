import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import './FadeInOut.less';

export type FadeSpeed = 'slow' | 'normal' | 'fast' | 'fastest';

interface Props {
  classname?: string;
  children: React.ReactNode | React.ReactNode[];
  valueToUpdate: string;
  speed?: FadeSpeed;
  scrollToTop?: boolean;
}

const FadeInOut: React.FC<Props> = ({ children, classname, valueToUpdate, speed = 'fast', scrollToTop }) => (
  <SwitchTransition>
    <CSSTransition
      key={valueToUpdate}
      addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
      appear
      classNames="FadeInOut"
      className={'FadeInOut FadeInOut--' + speed + (classname ? classname : '')}
      onExited={() => {
        scrollToTop &&
          window.scrollTo({
            top: 0,
          });
      }}
    >
      <div>{children}</div>
    </CSSTransition>
  </SwitchTransition>
);

export default FadeInOut;

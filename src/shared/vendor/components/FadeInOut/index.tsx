import React, { HTMLProps } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { speedMap } from './speedMap';

import './FadeInOut.less';

export type FadeSpeed = 'slow' | 'normal' | 'normalSlow' | 'fast' | 'fastest';

interface Props extends HTMLProps<HTMLDivElement> {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  valueToUpdate: string | boolean | number;
  speed?: FadeSpeed;
  scrollToTop?: boolean;
  appear?: boolean;
}

export const FadeInOut: React.FC<Props> = ({
  children,
  className,
  valueToUpdate = '',
  speed = 'fast',
  scrollToTop,
  appear = false,
  ...props
}) => (
  <SwitchTransition>
    <CSSTransition
      key={valueToUpdate.toString()}
      appear={appear}
      classNames="FadeInOut"
      className={'FadeInOut FadeInOut--' + speed + (className ? ` ${className}` : ' ')}
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
      <div {...props}>{children}</div>
    </CSSTransition>
  </SwitchTransition>
);

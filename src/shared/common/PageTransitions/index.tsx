import React from 'react';
import { Location } from 'history';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './PageTransitions.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  location: Location;
  scrollToTop?: boolean;
}

const PageTransitions: React.FC<Props> = ({ children, location: { pathname }, scrollToTop }) => (
  <TransitionGroup component={null}>
    <CSSTransition
      key={pathname} // Important for Link component
      appear={true}
      classNames="PageTransitions"
      timeout={{
        enter: 2000,
        exit: 2000,
      }}
      onExited={() => {
        scrollToTop &&
          window.scrollTo({
            top: 0,
          });
      }}
    >
      {children}
    </CSSTransition>
  </TransitionGroup>
);

export default PageTransitions;

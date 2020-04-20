import React from 'react';
import { Location } from 'history';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './PageTransitions.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  location: Location;
}

const PageTransitions: React.FC<Props> = ({ children, location: { pathname } }) => (
  <div className="PageTransitions">
    <TransitionGroup component={null}>
      <CSSTransition
        key={pathname} // Important for Link component
        appear={true}
        classNames="PageTransitions"
        timeout={{
          enter: 150,
          exit: 150,
        }}
        onExited={() => {
          window.scrollTo({
            top: 0,
          });
        }}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  </div>
);

export default PageTransitions;

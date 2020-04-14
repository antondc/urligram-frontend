import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Fade.less';

interface Props {
  mounted: boolean;
  time: number;
  classname?: string;
  fadeOutFinished?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

interface State {
  mounted: boolean;
}

class Fade extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.mounted !== prevState.mounted ? { mounted: nextProps.mounted } : null;
  }

  componentDidMount() {
    const { time } = this.props;
    document.documentElement.style.setProperty('--time', time + 'ms');
  }

  shouldComponentUpdate(nextProps) {
    return this.props.mounted !== nextProps.mounted;
  }

  render() {
    const { classname, time, fadeOutFinished, children } = this.props;
    const { mounted } = this.state;

    return (
      <div className={'Fade ' + (classname ? classname : '')}>
        <CSSTransition
          in={mounted}
          appear={true}
          unmountOnExit={true}
          className={'Fade--transition ' + (classname ? classname + '--transition' : '')}
          classNames={'Fade'}
          timeout={{
            enter: time,
            exit: time,
          }}
          onExited={() => {
            fadeOutFinished ? fadeOutFinished() : null;
          }}
        >
          <div className="Fade-initial">{children}</div>
        </CSSTransition>
      </div>
    );
  }
}

export default Fade;

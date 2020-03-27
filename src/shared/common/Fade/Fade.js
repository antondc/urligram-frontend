import React from 'react';
import './Fade.less';
import { CSSTransition } from 'react-transition-group';

class Fade extends React.Component {
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
    document.documentElement.style.setProperty('--time', this.props.time + 'ms');
  }

  shouldComponentUpdate(nextProps) {
    return this.props.mounted !== nextProps.mounted;
  }

  render() {
    return (
      <div className={'Fade ' + (this.props.classname ? this.props.classname : '')}>
        <CSSTransition
          in={this.state.mounted}
          appear={true}
          unmountOnExit={true}
          className={'Fade--transition ' + (this.props.classname ? this.props.classname + '--transition' : '')}
          classNames={'Fade'}
          timeout={{
            enter: this.props.time,
            exit: this.props.time,
          }}
          onExited={() => {
            this.props.fadeOutFinished ? this.props.fadeOutFinished() : null;
          }}
        >
          <div className="Fade-initial">{this.props.children}</div>
        </CSSTransition>
      </div>
    );
  }
}

export default Fade;

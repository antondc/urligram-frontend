import React from 'react';
import { Fade } from '@antoniodcorrea/components';

import './LayoutHelper.less';

const KEY_CODE = 192; // Key: º

interface State {
  mounted: boolean;
}

class LayoutHelper extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.testKeyDown);
  };

  testKeyDown = (e) => {
    if (e.which === KEY_CODE) {
      this.setState({
        mounted: !this.state.mounted,
      });
    }
  };

  render() {
    const { mounted } = this.state;

    return (
      <Fade mounted={mounted} speed="fastest">
        <div className="LayoutHelper">
          <div className="LayoutHelper-columns">
            <div className="LayoutHelper-externalPadding" />
            <div className="LayoutHelper-column" />
            <div className="LayoutHelper-gutter" />
            <div className="LayoutHelper-column" />
            <div className="LayoutHelper-gutter" />
            <div className="LayoutHelper-column" />
            <div className="LayoutHelper-gutter" />
            <div className="LayoutHelper-column" />
            <div className="LayoutHelper-gutter" />
            <div className="LayoutHelper-column" />
            <div className="LayoutHelper-gutter" />
            <div className="LayoutHelper-column" />
            <div className="LayoutHelper-gutter" />
            <div className="LayoutHelper-column" />
            <div className="LayoutHelper-gutter" />
            <div className="LayoutHelper-column" />
            <div className="LayoutHelper-gutter" />
            <div className="LayoutHelper-column" />
            <div className="LayoutHelper-gutter" />
            <div className="LayoutHelper-column" />
            <div className="LayoutHelper-gutter" />
            <div className="LayoutHelper-column" />
            <div className="LayoutHelper-gutter" />
            <div className="LayoutHelper-column" />
            <div className="LayoutHelper-externalPadding" />
          </div>
          <div className="LayoutHelper-rows">
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
            <div className="LayoutHelper-row" />
            <div className="LayoutHelper-rowGap" />
          </div>
        </div>
      </Fade>
    );
  }
}

export default LayoutHelper;

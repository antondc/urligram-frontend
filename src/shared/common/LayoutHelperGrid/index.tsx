import React from 'react';

import './LayoutHelperGrid.less';

const KEY_CODE = 'º';

interface State {
  mounted: boolean;
}

class LayoutHelperGrid extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount = (): void => {
    document.addEventListener('keydown', this.testKeyDown);
  };

  componentWillUnmount = (): void => {
    document.removeEventListener('keydown', this.testKeyDown);
  };

  testKeyDown = (e: KeyboardEvent): void => {
    if (e.key === KEY_CODE) {
      this.setState({
        mounted: !this.state.mounted,
      });
    }
  };

  render(): JSX.Element {
    const { mounted } = this.state;

    return (
      mounted && (
        <div className="LayoutHelperGrid">
          <div className="LayoutHelperGrid-column" />
          <div className="LayoutHelperGrid-column" />
          <div className="LayoutHelperGrid-column" />
          <div className="LayoutHelperGrid-column" />
          <div className="LayoutHelperGrid-column" />
          <div className="LayoutHelperGrid-column" />
          <div className="LayoutHelperGrid-column" />
          <div className="LayoutHelperGrid-column" />
          <div className="LayoutHelperGrid-column" />
          <div className="LayoutHelperGrid-column" />
          <div className="LayoutHelperGrid-column" />
          <div className="LayoutHelperGrid-column" />
        </div>
      )
    );
  }
}

export default LayoutHelperGrid;

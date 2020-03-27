import React from 'react';
import { withCookies } from 'react-cookie';
import WithAuth from '../../common/WithAuth/WithAuth';
import './Control.less';

class ControlUi extends React.Component {
  render() {
    return (
      <div className="Control">
        <h1 className="NotFound-h1">CONTROL PAGE</h1>
      </div>
    );
  }
}

export default withCookies(WithAuth(ControlUi));

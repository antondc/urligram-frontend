import React from 'react';
import Helmet from 'react-helmet';
import './NotFound.less';

class NotFound extends React.Component {
  render() {
    return (
      <div className="NotFound">
        <h1 className="NotFound-h1">Page not found</h1>
      </div>
    );
  }
}

export default NotFound;

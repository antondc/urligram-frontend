import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { pathsByLayout } from 'Router/routes';
import Content from './Content';
import CustomHeader from './CustomHeader';
import NoSidebar from './NoSidebar';

const Router: React.FC = () => {
  const pathsByLayoutWithLeftSidebar = pathsByLayout('withLeftSidebar');
  const pathsByLayoutFullPage = pathsByLayout('fullPage');
  const pathsByNoHeader = pathsByLayout('noHeader');

  return (
    <Switch>
      <Route path={pathsByNoHeader} component={CustomHeader} />
      <Route path={pathsByLayoutWithLeftSidebar} component={Content} exact />
      <Route path={pathsByLayoutFullPage} component={NoSidebar} />
    </Switch>
  );
};

export default Router;

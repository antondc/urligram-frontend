import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { pathsByLayout } from 'Router/routes';
import Content from './Content';
import FullPage from './FullPage';

const Router: React.FC = () => {
  const pathsByLayoutWithLeftSidebar = pathsByLayout('withLeftSidebar');
  const pathsByLayoutFullPage = pathsByLayout('fullPage');

  return (
    <Switch>
      <Route path={pathsByLayoutWithLeftSidebar} component={Content} exact />
      <Route path={pathsByLayoutFullPage} component={FullPage} />
    </Switch>
  );
};

export default Router;

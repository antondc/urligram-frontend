import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectSessionStatus } from 'Modules/Session/selectors/selectSessionStatus';
import { SESSION_INACTIVE } from 'Modules/Session/session.types';
import { pathsByLayout, Routes } from 'Router/routes';
import Content from './Content';
import FullPage from './FullPage';

const Router: React.FC = () => {
  const pathsByLayoutWithLeftSidebar = pathsByLayout('withLeftSidebar');
  const pathsByLayoutFullPage = pathsByLayout('fullPage');
  const sessionStatus = useSelector(selectSessionStatus);
  const currentSlug = useSelector(selectCurrentLanguageSlug);
  const sessionStatusInactive = sessionStatus === SESSION_INACTIVE;

  return (
    <Switch>
      {sessionStatusInactive && <Redirect from={Routes.SignUp.path} to={'/' + currentSlug + '/confirm-sign-up'} />}

      <Route path={pathsByLayoutWithLeftSidebar} component={Content} exact />
      <Route path={pathsByLayoutFullPage} component={FullPage} />
    </Switch>
  );
};

export default Router;

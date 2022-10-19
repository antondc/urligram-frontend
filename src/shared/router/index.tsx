import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { pathsByLayout } from 'Router/routes';
import { Location } from 'Services/History';
import { FadeInOut } from '@antoniodcorrea/components';
import Content from './Content';
import CustomHeader from './CustomHeader';
import NoSidebar from './NoSidebar';

interface Props {
  location: Location;
}

const Router: React.FC<Props> = ({ location }) => {
  const pathsByLayoutWithLeftSidebar = pathsByLayout('withLeftSidebar');
  const pathsByLayoutFullPage = pathsByLayout('fullPage');
  const pathsByNoHeader = pathsByLayout('noHeader');
  const currentRoute = useSelector(selectCurrentRoute);
  const currentLayout = currentRoute?.layout;
  const pathWithoutLanguageParam = useSelector(selectPathWithoutLanguageParam);

  return (
    <FadeInOut valueToUpdate={currentLayout} speed="fastest" appear>
      <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
        <Route path={pathsByNoHeader} component={CustomHeader} />
        <Route path={pathsByLayoutWithLeftSidebar} component={Content} exact />
        <Route path={pathsByLayoutFullPage} component={NoSidebar} />
      </Switch>
    </FadeInOut>
  );
};

export default Router;

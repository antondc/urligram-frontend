import React from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { SITE_TITLE } from 'Root/src/shared/constants';
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
  const currentSlug = useSelector(selectCurrentLanguageSlug);

  return (
    <>
      <Helmet>
        <title>{SITE_TITLE}</title>
        <meta name="description" content="Social bookmarking" />
        <meta name="author" content={SITE_TITLE} />
        <meta property="og:locale" content={`${currentSlug}-${currentSlug.toUpperCase()}`} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:url" content={currentRoute.href} />
        <meta property="og:site_name" content={SITE_TITLE} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${currentRoute.domain}/images/site-image.png`} />
        <meta property="twitter:title" content={SITE_TITLE} />
        <meta property="twitter:url" content={currentRoute.href} />
        <meta property="twitter:image" content={`${currentRoute.domain}/images/site-image.png`} />
      </Helmet>
      <FadeInOut valueToUpdate={currentLayout} speed="fastest" appear>
        <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
          <Route path={pathsByNoHeader} component={CustomHeader} />
          <Route path={pathsByLayoutWithLeftSidebar} component={Content} exact />
          <Route path={pathsByLayoutFullPage} component={NoSidebar} />
        </Switch>
      </FadeInOut>
    </>
  );
};

export default Router;

import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import A from 'Components/A';
import CardItem from 'Components/CardItem';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Routes } from 'Router/routes';
import { Space } from '@antoniodcorrea/components';

import './NotFound.less';

const NotFound: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return (
    <>
      <Helmet title={`${SITE_TITLE} · ${glossary.notFound}`} />
      <CardItem className="NotFound">
        <h1 className="NotFound-title">{glossary?.notFound} 😵</h1>
        <p className="NotFound-text">We couldnt find what you were looking for.</p>
        <p className="NotFound-text">
          But you can continue searching for
          <Space />
          <A className="NotFound-link" href={Routes.Home.route} frontend underlined>
            bookmarks
          </A>
          ,<Space />
          <A className="NotFound-link" href={Routes.Lists.route} frontend underlined>
            lists
          </A>
          <Space />
          or
          <Space />
          <A className="NotFound-link" href={Routes.Users.route} frontend underlined>
            users
          </A>
          .
        </p>
      </CardItem>
    </>
  );
};

export default NotFound;

import React from 'react';
import { useSelector } from 'react-redux';

import A from 'Components/A';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { Routes } from 'Router/routes';
import { H1, Hr, P, Span } from 'Vendor/components';

import './NotFound.less';

const NotFound: React.FC = () => {
  const currentGlossary = useSelector(selectCurrentGlossary);

  return (
    <>
      <div className="NotFound">
        <H1 className="NotFound-h1">{currentGlossary?.notFound} 😵</H1>
        <Hr spacer />
        <P>
          <Span weight="semiBold">We couldnt find what you were looking for.</Span>
        </P>
        <P>
          <Span weight="semiBold">
            But you can continue searching for{' '}
            <A className="NotFound-link" href={Routes.Home.route} frontend underlined>
              bookmarks
            </A>
            ,{' '}
            <A className="NotFound-link" href={Routes.Lists.route} frontend underlined>
              lists
            </A>{' '}
            or{' '}
            <A className="NotFound-link" href={Routes.Users.route} frontend underlined>
              users
            </A>{' '}
            .
          </Span>
        </P>
      </div>
    </>
  );
};

export default NotFound;

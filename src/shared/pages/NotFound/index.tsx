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
          <Span bold>We couldnt find what you were looking for.</Span>
        </P>
        <P>
          <Span bold>
            But you can continue searching for{' '}
            <A href={Routes.Links.route} frontend underlined>
              links
            </A>
            ,{' '}
            <A href={Routes.Lists.route} frontend underlined>
              lists
            </A>{' '}
            or{' '}
            <A href={Routes.Users.route} frontend underlined>
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

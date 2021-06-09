import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSession } from 'Modules/Session/selectors/selectSession';
import { COOKIE_POLICY_COOKIE, DELAY_ONE_HALF_SEC } from 'Root/src/shared/constants';
import { CookiesWrapper } from 'Services/CookiesWrapper';
import { CookiesBanner as CookiesBannerUi } from './CookiesBanner';

const CookiesBanner: React.FC = () => {
  const session = useSelector(selectSession);
  const cookiesWrapper = new CookiesWrapper();
  const acceptedCookiesPoliciy = cookiesWrapper.getCookie(COOKIE_POLICY_COOKIE);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(!session?.id && !acceptedCookiesPoliciy);

  const onAccept = () => {
    const cookiesWrapper = new CookiesWrapper();
    cookiesWrapper.setCookie(COOKIE_POLICY_COOKIE, '1');
    setAccepted(true);
  };

  useEffect(() => {
    if (acceptedCookiesPoliciy) {
      setTimeout(() => setRender(false), DELAY_ONE_HALF_SEC);

      return;
    }

    setRender(true);
  }, [accepted]);

  if (!render) return null;

  return <CookiesBannerUi onAccept={onAccept} accepted={accepted} />;
};

export default CookiesBanner;

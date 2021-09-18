import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSession } from 'Modules/Session/selectors/selectSession';
import { COOKIE_POLICY_COOKIE, DELAY_SLOW_MS } from 'Root/src/shared/constants';
import { CookiesWrapper } from 'Services/CookiesWrapper';
import { CookiesBanner as CookiesBannerUi } from './CookiesBanner';

const CookiesBanner: React.FC = () => {
  const session = useSelector(selectSession);
  const cookiesWrapper = new CookiesWrapper();
  const [accepted, setAccepted] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(!session?.id);

  const onAccept = () => {
    const cookiesWrapper = new CookiesWrapper();
    cookiesWrapper.setCookie(COOKIE_POLICY_COOKIE, '1');
    setAccepted(true);

    setTimeout(() => {
      setShow(false);
    }, DELAY_SLOW_MS);
  };

  useEffect(() => {
    const acceptedCookiesPolicy = cookiesWrapper.getCookie(COOKIE_POLICY_COOKIE);
    if (session?.id || acceptedCookiesPolicy) setShow(false);
    if (!session?.id && !acceptedCookiesPolicy) setShow(true);
  }, [session]);

  return <CookiesBannerUi onAccept={onAccept} accepted={accepted} show={show} />;
};

export default CookiesBanner;

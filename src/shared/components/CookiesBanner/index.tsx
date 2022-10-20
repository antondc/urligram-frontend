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
  const timeMsInNinetyDays = Date.now() + 1000 * 60 * 60 * 24 * 90;

  const onAccept = () => {
    const cookiesWrapper = new CookiesWrapper();

    cookiesWrapper.setCookie(COOKIE_POLICY_COOKIE, '1', timeMsInNinetyDays);
    setAccepted(true);

    setTimeout(() => {
      setShow(false);
    }, DELAY_SLOW_MS);
  };

  const onReject = () => {
    const cookiesWrapper = new CookiesWrapper();
    cookiesWrapper.setCookie(COOKIE_POLICY_COOKIE, '0', timeMsInNinetyDays);
    setAccepted(false);

    setTimeout(() => {
      setShow(false);
    }, DELAY_SLOW_MS);
  };

  useEffect(() => {
    const acceptedCookiesPolicy = cookiesWrapper.getCookie(COOKIE_POLICY_COOKIE);
    if (session?.id || acceptedCookiesPolicy) {
      setShow(false);
      setAccepted(true);
    } else {
      setShow(true);
      setAccepted(false);
    }
  }, [session]);

  return <CookiesBannerUi onAccept={onAccept} onReject={onReject} accepted={accepted} show={show} />;
};

export default CookiesBanner;

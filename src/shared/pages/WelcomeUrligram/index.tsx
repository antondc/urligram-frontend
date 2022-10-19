import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { Routes } from 'Router/routes';
import history from 'Services/History';
import { DEFAULT_THROTTLE_VALUE, throttle } from 'Tools/utils/function/throttle';
import { WelcomeUrligram as WelcomeUrligramUi } from './WelcomeUrligram';

const WelcomeUrligram: React.FC = () => {
  const currentSlug = useSelector(selectCurrentLanguageSlug);
  const userIsLoggedIn = useSelector(selectSessionLoggedIn);

  useEffect(() => {
    window.addEventListener('scroll', throttle(fadeOnScroll, DEFAULT_THROTTLE_VALUE));
    window.addEventListener('scroll', throttle(heroOnScroll, DEFAULT_THROTTLE_VALUE));

    return () => {
      window.removeEventListener('scroll', throttle(fadeOnScroll, DEFAULT_THROTTLE_VALUE));
      window.removeEventListener('scroll', throttle(heroOnScroll, DEFAULT_THROTTLE_VALUE));
    };
  }, []);

  useEffect(() => {
    if (!userIsLoggedIn) return;

    history.push(`/${currentSlug}${Routes.Home.route}`);
  }, [userIsLoggedIn]);

  const heroOnScroll = () => {
    const shapeElement = document.getElementById('shape');
    const firstElement = document.getElementById('first');
    const scrollPosition = window.scrollY;
    const translateShapeElementY = -(scrollPosition / 4);
    const translateFirstElementY = -(scrollPosition / 3);

    shapeElement.style.transform = `rotate(3deg) translateY(${translateShapeElementY}px)`;
    firstElement.style.transform = `translateY(${translateFirstElementY}px)`;
  };

  const fadeOnScroll = () => {
    const firstElement = document.getElementById('first');
    const wavesElement = document.getElementById('waves');
    const thirdElement = document.getElementById('thirdElement');
    const whoElement = document.getElementById('who');
    const whatElement = document.getElementById('what');

    const intersectionCallback = (entries, _observer) => {
      entries.forEach((entry) => {
        entry.target.style.opacity = entry.isIntersecting ? '1' : '0';
      });
    };
    const observer = (percentage) =>
      new IntersectionObserver(intersectionCallback, {
        threshold: [percentage],
      });

    observer(0.1).observe(firstElement);
    observer(0.1).observe(whoElement);
    observer(0.3).observe(thirdElement);
    observer(1).observe(wavesElement);
    observer(0.1).observe(whatElement);
  };

  return <WelcomeUrligramUi currentSlug={currentSlug} />;
};

export default WelcomeUrligram;

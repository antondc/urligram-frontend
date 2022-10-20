import React from 'react';
import Helmet from 'react-helmet';

import ThirdIllustration from 'Assets/svg/bookmark_illustration.svg';
import HeroIllustration from 'Assets/svg/devices.svg';
import LogoCircle from 'Assets/svg/logoCircle.svg';
import Waves from 'Assets/svg/waves.svg';
import Footer from 'Components/Footer';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { translations } from './translations';

import './WelcomeUrligram.less';

interface Props {
  currentSlug: string;
}

export const WelcomeUrligram: React.FC<Props> = ({ currentSlug }) => (
  <>
    <div className="WelcomeUrligram-shape" id="shape" />
    <div className="WelcomeUrligram">
      <Helmet>
        <title>{`${SITE_TITLE} · Welcome`}</title>
      </Helmet>
      <div className="WelcomeUrligram-first" id="first">
        <div className="WelcomeUrligram-firstText">{translations[currentSlug].hero}</div>
        <HeroIllustration className="WelcomeUrligram-firstImage" />
      </div>
      <div className="WelcomeUrligram-second" id="who">
        <div className="WelcomeUrligram-secondTitle">{translations[currentSlug].whoTitle}</div>
        <div
          className="WelcomeUrligram-secondText"
          dangerouslySetInnerHTML={{
            __html: translations[currentSlug].whoText,
          }}
        />
      </div>
      <div className="WelcomeUrligram-third" id="thirdElement">
        <ThirdIllustration className="WelcomeUrligram-thirdIllustration" />
        <div className="WelcomeUrligram-backgroundImages" />
      </div>
      <div className="WelcomeUrligram-second" id="what">
        <div className="WelcomeUrligram-secondTitle">{translations[currentSlug].whatTitle}</div>
        <div
          className="WelcomeUrligram-secondText"
          dangerouslySetInnerHTML={{
            __html: translations[currentSlug].whatText,
          }}
        />
      </div>
      <div className="WelcomeUrligram-fourth" id="waves">
        <LogoCircle className="WelcomeUrligram-logo" />
        <Waves className="WelcomeUrligram-waves" />
        <div className="WelcomeUrligram-wavesBackground" />
      </div>
    </div>
    <Footer className="WelcomeUrligram-footer" />
  </>
);

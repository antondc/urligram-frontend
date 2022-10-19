import React from 'react';
import Helmet from 'react-helmet';

import HeroIllustration from 'Assets/svg/devices.svg';
import Shape from 'Assets/svg/shape-two.svg';
import Waves from 'Assets/svg/waves.svg';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { translations } from './translations';

import './WelcomeUrligram.less';

interface Props {
  currentSlug: string;
}

export const WelcomeUrligram: React.FC<Props> = ({ currentSlug }) => (
  <>
    <Helmet title={`${SITE_TITLE} · WelcomeUrligram`} />
    <div className="WelcomeUrligram-shape" id="shape" />
    {/* <Header currentSlug={currentSlug} /> */}
    <div className="WelcomeUrligram">
      <Helmet>
        <title>Urligram</title>
        <meta name="description" content="Software and publishing projects" />
        <meta name="author" content="Urligram" />
        <meta property="og:locale" content="en-EN" />
        <meta property="og:title" content="Urligram" />
        <meta property="og:url" content="https://www.urligram.com" />
        <meta property="og:site_name" content="Urligram" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="twitter:url" content="https://www.urligram.com" />
        <meta property="twitter:title" content="Urligram" />
        <meta property="twitter:image" content="/images/logo.png" />
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
      <div className="WelcomeUrligram-third" id="images">
        <Shape className="WelcomeUrligram-thirdShape" />
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
        <Waves className="WelcomeUrligram-waves" />
        <div className="WelcomeUrligram-wavesBackground" />
      </div>
    </div>
    {/* <Footer /> */}
  </>
);

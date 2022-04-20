import React from 'react';
import Helmet from 'react-helmet';

import Chrome from 'Assets/svg/browserChrome.svg';
import Firefox from 'Assets/svg/browserFirefox.svg';
import { BaseModalTitle } from 'Components/BaseModal';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Button } from '@antoniodcorrea/components';

import './Extension.less';

interface Props {
  data: {
    [key: string]: {
      title: string;
      titleFirefox: string;
      textFirefox: string;
      buttonTextFirefox: string;
      titleChrome: string;
      textChrome: string;
      buttonTextChrome: string;
    };
  };
  currentSlug: string;
  installFirefoxExtension: () => void;
  installChromeExtension: () => void;
}

export const Extension: React.FC<Props> = ({ data, currentSlug, installFirefoxExtension, installChromeExtension }) => (
  <>
    <Helmet title={`${SITE_TITLE} · Extension`} />
    <div className="Extension">
      <BaseModalTitle className="Extension-title">{data[currentSlug]?.title}</BaseModalTitle>

      <div className="Extension-extension Extension-extensionFirefox">
        <h2 className="Extension-subTitle">
          {data[currentSlug]?.titleFirefox} <Firefox className="Extension-icon" />
        </h2>
        <div className="Extension-text">{data[currentSlug]?.textFirefox}</div>
        <Button
          className="Extension-button"
          text={data[currentSlug]?.buttonTextFirefox}
          onClick={installFirefoxExtension}
        />
      </div>
      <div className="Extension-extension Extension-extensionChrome">
        <h2 className="Extension-subTitle">
          {data[currentSlug]?.titleChrome} <Chrome className="Extension-icon" />
        </h2>
        <div className="Extension-text">{data[currentSlug]?.textChrome}</div>
        <Button
          className="Extension-button"
          text={data[currentSlug]?.buttonTextChrome}
          onClick={installChromeExtension}
        />
      </div>
    </div>
  </>
);

import React from 'react';

import LogoSvg from 'Assets/svg/logo.svg';

import './Logo.less';

interface Props {
  className?: string;
  loadingBeat?: boolean;
  loadingColors?: boolean;
}

const Logo: React.FC<Props> = ({ loadingBeat, loadingColors, className }) => {
  const loadingBeatIfNotLoadingColors = !!loadingBeat && !loadingColors;

  return (
    <LogoSvg
      className={
        'Logo' +
        (loadingBeatIfNotLoadingColors ? ' Logo--loadingBeat ' : '') +
        (loadingColors ? ' Logo--loadingColors ' : '') +
        (className ? ' ' + className : '')
      }
    />
  );
};

export default Logo;

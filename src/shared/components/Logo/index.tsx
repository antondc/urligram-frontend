import React from 'react';

import LogoSvg from 'Assets/svg/logo.svg';
import A from 'Components/A';

import './Logo.less';

interface Props {
  className?: string;
  loadingBeat?: boolean;
  loadingColors?: boolean;
}

const Logo: React.FC<Props> = ({ className, loadingBeat, loadingColors }) => {
  const loadingBeatIfNotLoadingColors = !!loadingBeat && !loadingColors;

  return (
    <A
      className={
        'Logo' +
        (loadingBeatIfNotLoadingColors ? ' Logo--loadingBeat ' : '') +
        (loadingColors ? ' Logo--loadingColors ' : '') +
        (className ? ' ' + className : '')
      }
      href={'/'}
      frontend
      underlined
    >
      <LogoSvg className="Logo-icon" />
      <h3 className="Logo-text">Linking</h3>
    </A>
  );
};

export default Logo;

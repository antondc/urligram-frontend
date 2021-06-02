import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { Subheader as SubheaderUi } from './Subheader';

import './Subheader.less';

const Subheader: React.FC = () => {
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const dateNowMs = Math.floor(Date.now() / 1000);
  const date = new LocaleFormattedDate({ unixTime: dateNowMs, locale: currentLanguageSlug });
  const formattedDate = date.getLocaleFormattedDate();

  return <SubheaderUi formattedDate={formattedDate} />;
};

export default Subheader;

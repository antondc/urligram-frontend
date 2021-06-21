import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { HeaderSecond as HeaderSecondUi } from './HeaderSecond';

export type WeatherData = {
  temperature: number;
  humidity: number;
  weatherCode: number;
  windSpeed: number;
  widDirection: string;
  pressure: number;
  weatherDesc: string;
  precipitations: number;
};

export interface WeatherApiResponse {
  data: {
    attributes: WeatherData;
  };
}

import './HeaderSecond.less';

const HeaderSecond: React.FC = () => {
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const dateNowMs = Math.floor(Date.now() / 1000);
  const date = new LocaleFormattedDate({ unixTime: dateNowMs, locale: currentLanguageSlug });
  const formattedDate = date.getLocaleFormattedDate();

  return <HeaderSecondUi formattedDate={formattedDate} />;
};

export default HeaderSecond;

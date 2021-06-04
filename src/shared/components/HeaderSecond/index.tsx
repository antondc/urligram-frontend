import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import HttpClient from 'Services/HttpClient';
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

import { LocalStorageWrapper } from '../../services/LocalStorageWrapper';

import './HeaderSecond.less';

const HeaderSecond: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(undefined);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const dateNowMs = Math.floor(Date.now() / 1000);
  const date = new LocaleFormattedDate({ unixTime: dateNowMs, locale: currentLanguageSlug });
  const formattedDate = date.getLocaleFormattedDate();
  const localStorageWrapper = new LocalStorageWrapper();
  const timeMsInFourHours = Date.now() + 4 * 60 * 60 * 1000;

  useEffect(() => {
    const asyncFunction = async () => {
      const localStorageWeatherData = localStorageWrapper.getValue<WeatherData>('weather');
      if (!!localStorageWeatherData) {
        setWeatherData(localStorageWeatherData);

        return;
      }

      try {
        const { data } = await HttpClient.get<void, WeatherApiResponse>('/weather/single');

        await setWeatherData(data?.attributes);

        localStorageWrapper.setValue('weather', data?.attributes, timeMsInFourHours);
      } catch (error) {}
    };

    asyncFunction();
  }, []);

  return <HeaderSecondUi formattedDate={formattedDate} weatherData={weatherData} />;
};

export default HeaderSecond;

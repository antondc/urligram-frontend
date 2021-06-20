import React from 'react';

import Clock from 'Components/Clock';
import { Flex, Frame, Space, Span } from 'Vendor/components';
import Humidity from 'Vendor/WeatherIcons/svg/wi-cloud.svg';
import Precipitations from 'Vendor/WeatherIcons/svg/wi-raindrop.svg';
import Wind from 'Vendor/WeatherIcons/svg/wi-small-craft-advisory.svg';
import Termometer from 'Vendor/WeatherIcons/svg/wi-thermometer-exterior.svg';
import { WeatherData } from '.';
import WeatherIcon from './WeatherIcon';

import './HeaderSecond.less';

interface Props {
  formattedDate: string;
  weatherData: WeatherData;
}

export const HeaderSecond: React.FC<Props> = ({ formattedDate, weatherData }) => (
  <Frame className="HeaderSecond" padding="none" borderBottom={false} borderTop={false}>
    <Flex growHorizontal growVertical horizontal="between" vertical="stretch" noWrap>
      <div className="HeaderSecond-item HeaderSecond-weather">
        <Flex vertical="center" horizontal="left" noWrap>
          <WeatherIcon className="HeaderSecond-weatherIcon" weatherCode={weatherData?.weatherCode} />
          <Space />
          <Space />
          {weatherData?.weatherDesc}
          <Space />•<Space />
          <Termometer className="HeaderSecond-smallIcon" />
          {weatherData?.temperature} Cº
          <Space />•<Space />
          <Precipitations className="HeaderSecond-smallIcon" />
          {weatherData?.precipitations}mm
          <Space />•<Space />
          <Humidity className="HeaderSecond-smallIcon" />
          {weatherData?.humidity} %
          <Space />•<Space />
          <Wind className="HeaderSecond-smallIcon" />
          {weatherData?.windSpeed} km/h
        </Flex>
      </div>
      <div className="HeaderSecond-item HeaderSecond-date">{formattedDate}</div>
      <div className="HeaderSecond-item HeaderSecond-clock">
        <Clock />
      </div>
    </Flex>
  </Frame>
);

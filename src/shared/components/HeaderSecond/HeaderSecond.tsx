import React from 'react';

import Clock from 'Components/Clock';
import { Flex, Frame, Space, Span, SpinnerCircularBrute } from 'Vendor/components';
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
      <Frame
        className="HeaderSecond-item HeaderSecond-weather"
        grow
        padding="small"
        borderBottom={false}
        borderTop={false}
        borderRight={false}
        borderLeft={false}
      >
        <Flex vertical="center" horizontal="left" noWrap>
          <WeatherIcon className="HeaderSecond-weatherIcon" weatherCode={weatherData?.weatherCode} />
          <Space />
          <Space />
          <Span size="small" weight="semiBold">
            {weatherData?.weatherDesc}
          </Span>
          <Space />•<Space />
          <Termometer className="HeaderSecond-smallIcon" />
          <Span size="small" weight="semiBold">
            {weatherData?.temperature} Cº
          </Span>
          <Space />•<Space />
          <Precipitations className="HeaderSecond-smallIcon" />
          <Span size="small" weight="semiBold">
            {weatherData?.precipitations}mm
          </Span>
          <Space />•<Space />
          <Humidity className="HeaderSecond-smallIcon" />
          <Span size="small" weight="semiBold">
            {weatherData?.humidity} %
          </Span>
          <Space />•<Space />
          <Wind className="HeaderSecond-smallIcon" />
          <Span size="small" weight="semiBold">
            {weatherData?.windSpeed} km/h
          </Span>
        </Flex>
      </Frame>
      <Frame
        className="HeaderSecond-item HeaderSecond-date"
        grow={false}
        padding="small"
        borderBottom={false}
        borderTop={false}
      >
        <Flex vertical="center">
          <Span weight="semiBold">{formattedDate}</Span>
        </Flex>
      </Frame>
      <Frame
        className="HeaderSecond-item HeaderSecond-clock"
        grow={false}
        padding="small"
        borderBottom={false}
        borderTop={false}
        borderRight={false}
        borderLeft={false}
      >
        <Clock />
      </Frame>
    </Flex>
  </Frame>
);

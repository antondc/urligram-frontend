import React from 'react';

import WiCloud from 'Vendor/WeatherIcons/svg/wi-cloud.svg';
import WiCloudy from 'Vendor/WeatherIcons/svg/wi-cloudy.svg';
import WiDayCloudyHigh from 'Vendor/WeatherIcons/svg/wi-day-cloudy-high.svg';
import WiRainHail from 'Vendor/WeatherIcons/svg/wi-day-hail.svg';
import WiDayHaze from 'Vendor/WeatherIcons/svg/wi-day-haze.svg';
import WiDayLightning from 'Vendor/WeatherIcons/svg/wi-day-lightning.svg';
import WiDayShowers from 'Vendor/WeatherIcons/svg/wi-day-showers.svg';
import WiDaySnowThunderstorm from 'Vendor/WeatherIcons/svg/wi-day-snow-thunderstorm.svg';
import WiDaySnowWind from 'Vendor/WeatherIcons/svg/wi-day-snow-wind.svg';
import WiDaySunnyOvercast from 'Vendor/WeatherIcons/svg/wi-day-sunny-overcast.svg';
import WiDaySunny from 'Vendor/WeatherIcons/svg/wi-day-sunny.svg';
import WiDayThunderstorm from 'Vendor/WeatherIcons/svg/wi-day-thunderstorm.svg';
import WiFog from 'Vendor/WeatherIcons/svg/wi-fog.svg';
import WiRain from 'Vendor/WeatherIcons/svg/wi-rain.svg';

interface Props {
  weatherCode: number;
  className: string;
}

const WeatherIcon: React.FC<Props> = ({ weatherCode, ...props }) => {
  switch (weatherCode) {
    case 100:
      return <WiDaySunny {...props} />;
    case 200:
      return <WiDaySunnyOvercast {...props} />;
    case 201:
      return <WiDayCloudyHigh {...props} />;
    case 202:
      return <WiCloud {...props} />;
    case 203:
      return <WiCloudy {...props} />;
    case 300:
      return <WiDayShowers {...props} />;
    case 301:
      return <WiRainHail {...props} />;
    case 302:
      return <WiRainHail {...props} />;
    case 304:
      return <WiRain {...props} />;
    case 400:
      return <WiDayLightning {...props} />;
    case 402:
      return <WiDayThunderstorm {...props} />;
    case 402:
      return <WiDayThunderstorm {...props} />;
    case 500:
      return <WiDaySnowWind {...props} />;
    case 501:
      return <WiDaySnowWind {...props} />;
    case 502:
      return <WiDaySnowWind {...props} />;
    case 503:
      return <WiDaySnowWind {...props} />;
    case 504:
      return <WiDaySnowThunderstorm {...props} />;
    case 600:
      return <WiDayHaze {...props} />;
    case 601:
      return <WiFog {...props} />;

    default:
      return <div {...props} />;
  }
};

export default WeatherIcon;

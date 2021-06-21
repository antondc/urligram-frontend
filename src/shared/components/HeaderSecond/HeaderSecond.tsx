import React from 'react';

import Clock from 'Components/Clock';
import { Flex, Frame } from 'Vendor/components';
import { WeatherData } from '.';

import './HeaderSecond.less';

interface Props {
  formattedDate: string;
}

export const HeaderSecond: React.FC<Props> = ({ formattedDate }) => (
  <Frame className="HeaderSecond" padding="none" borderBottom={false} borderTop={false}>
    <Flex growHorizontal growVertical horizontal="between" vertical="stretch" noWrap>
      <div className="HeaderSecond-item HeaderSecond-weather">
        <Flex vertical="center" horizontal="left" noWrap>
          {/*  */}
        </Flex>
      </div>
      <div className="HeaderSecond-item HeaderSecond-date">{formattedDate}</div>
      <div className="HeaderSecond-item HeaderSecond-clock">
        <Clock />
      </div>
    </Flex>
  </Frame>
);

import React from 'react';

import Clock from 'Components/Clock';
import { Flex, Frame, Span, SpinnerCircularBrute } from 'Vendor/components';

import './HeaderSecond.less';

interface Props {
  formattedDate: string;
  weatherString: string;
}

export const HeaderSecond: React.FC<Props> = ({ formattedDate, weatherString }) => (
  <Frame className="HeaderSecond" padding="none" borderBottom={false} borderTop={false}>
    <Flex growHorizontal growVertical horizontal="between" vertical="stretch" noWrap>
      {/* <Frame
        className="HeaderSecond-item"
        grow
        padding="small"
        borderBottom={false}
        borderTop={false}
        borderRight={false}
        borderLeft={false}
      >
        <Flex vertical="center" horizontal="left">
          <SpinnerCircularBrute />
        </Flex>
      </Frame> */}
      <Frame
        className="HeaderSecond-item HeaderSecond-weather"
        grow
        padding="small"
        borderBottom={false}
        borderTop={false}
        borderRight={false}
        borderLeft={false}
      >
        <Flex vertical="center" horizontal="left">
          <Span className="HeaderSecond-weatherText" bold>
            {weatherString}
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
          <Span bold>{formattedDate}</Span>
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

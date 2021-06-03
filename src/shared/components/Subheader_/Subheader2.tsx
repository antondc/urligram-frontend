import React from 'react';

import Clock from 'Components/Clock';
import { Flex, Frame, Span, SpinnerCircularBrute } from 'Vendor/components';

import './Subheader.less';

interface Props {
  formattedDate: string;
  weatherString: string;
}

export const Subheader: React.FC<Props> = ({ formattedDate, weatherString }) => (
  <Frame className="Subheader" padding="none" borderBottom={false} borderTop={false}>
    <Flex growHorizontal growVertical horizontal="between" vertical="stretch" noWrap>
      {/* <Frame
        className="Subheader-item"
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
        className="Subheader-item Subheader-weather"
        grow
        padding="small"
        borderBottom={false}
        borderTop={false}
        borderRight={false}
        borderLeft={false}
      >
        <Flex vertical="center" horizontal="left">
          <Span className="Subheader-weatherText" bold>
            {weatherString}
          </Span>
        </Flex>
      </Frame>
      <Frame
        className="Subheader-item Subheader-date"
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
        className="Subheader-item Subheader-clock"
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

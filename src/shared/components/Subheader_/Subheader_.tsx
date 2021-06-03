import React from 'react';

import Clock from 'Components/Clock';
import { Flex, Frame, Span } from 'Vendor/components';

import './Subheader_.less';

interface Props {
  formattedDate: string;
  weatherString: string;
}

export const Subheader_: React.FC<Props> = ({ formattedDate, weatherString }) => (
  <Frame className="Subheader_" padding="none" borderBottom={false} borderTop={false}>
    <Flex growHorizontal growVertical horizontal="between" vertical="stretch" noWrap>
      <Frame
        className="Subheader_-item Subheader_-weather"
        grow
        padding="small"
        borderBottom={false}
        borderTop={false}
        borderRight={false}
        borderLeft={false}
      >
        <Flex vertical="center" horizontal="left">
          <Span className="Subheader_-weatherText" bold>
            {weatherString}
          </Span>
        </Flex>
      </Frame>
      <Frame
        className="Subheader_-item Subheader_-date"
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
        className="Subheader_-item Subheader_-clock"
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

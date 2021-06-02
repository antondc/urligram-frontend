import React from 'react';

import Clock from 'Components/Clock';
import { Flex, Frame, Span } from 'Vendor/components';

import './Subheader.less';

interface Props {
  formattedDate: string;
}
export const Subheader: React.FC<Props> = ({ formattedDate }) => (
  <Frame className="SubHeader" padding="none" borderBottom={false} borderTop={false}>
    <Flex growHorizontal horizontal="between" vertical="center" noWrap>
      <Frame
        className="SubHeader-item SubHeader-statement"
        grow
        padding="small"
        borderBottom={false}
        borderTop={false}
        borderRight={false}
        borderLeft={false}
      >
        <Span bold>Lorem ipsum dolor</Span>
      </Frame>
      <Frame
        className="SubHeader-item SubHeader-date"
        grow={false}
        padding="small"
        borderBottom={false}
        borderTop={false}
      >
        <Span bold>{formattedDate}</Span>
      </Frame>
      <Frame
        className="SubHeader-item SubHeader-clock"
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

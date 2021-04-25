import React from 'react';

import { Flex, Hr, Span } from 'Vendor/components';

interface Props {
  message?: string;
}

const Empty: React.FC<Props> = ({ message = 'ⵁ Empty set' }) => (
  <Flex horizontal="center">
    <Hr size="nano" />
    <Hr size="big" spacer />
    <Span bold>{message}</Span>
    <Hr size="normal" spacer />
  </Flex>
);

export default Empty;

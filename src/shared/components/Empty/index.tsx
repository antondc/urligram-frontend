import React from 'react';

import { Flex, Hr, Span } from 'Vendor/components';

interface Props {
  message?: string;
}

const Empty: React.FC<Props> = ({ message = 'ⵁ Empty set' }) => (
  <Flex horizontal="center">
    <Hr size="normal" spacer />
    <Span weight="semiBold">{message}</Span>
    <Hr size="normal" spacer />
  </Flex>
);

export default Empty;

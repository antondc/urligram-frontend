import React from 'react';
import './Flex.less';

export type FlexHorizontal = 'center' | 'right' | 'left' | 'even' | 'around' | 'between';
export type FlexVertical = 'center' | 'top' | 'bottom';

interface Props {
  children: React.ReactNode;
  horizontal?: FlexHorizontal;
  vertical?: FlexVertical;
}

const Flex: React.FC<Props> = ({ children, horizontal, vertical }) => (
  <div
    className={
      'Flex' + (horizontal ? ' Flex-horizontal--' + horizontal : '') + (vertical ? ' Flex-vertical--' + vertical : '')
    }
  >
    {children}
  </div>
);

export default Flex;

import React from 'react';

import { Span, SpanSize } from '../Span';

import './Ellipsis.less';

interface Props {
  className?: string;
  size?: SpanSize;
}

export const Ellipsis: React.FC<Props> = ({ className, size }) => (
  <Span className={'Ellipsis' + (className ? ` ${className}` : '')} size={size}>
    <span className="Ellipsis-dot1">.</span>
    <span className="Ellipsis-dot2">.</span>
    <span className="Ellipsis-dot3">.</span>
  </Span>
);

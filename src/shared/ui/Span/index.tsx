import React from 'react';

import './Span.less';

interface Props {
  children: React.ReactNode;
  size?: 'normal' | 'small' | 'micro' | 'nano';
  bold?: boolean;
  italics?: boolean;
  uppercase?: boolean;
  disabled?: boolean;
  className?: string;
  grow?: boolean;
  center?: boolean;
}

const Span: React.SFC<Props> = ({
  children,
  size = 'normal',
  bold = false,
  italics = false,
  disabled = false,
  uppercase = false,
  className,
  grow,
  center,
}) => (
  <span
    className={
      (className ? className + ' ' : '') +
      'Span' +
      (' Span-' + size) +
      (bold ? ' Span--bold' : '') +
      (italics ? ' Span--italics' : '') +
      (disabled ? ' Span--disabled' : '') +
      (uppercase ? ' Span--uppercase' : '') +
      (grow ? ' Span--grow' : '') +
      (center ? ' Span--center' : '')
    }
  >
    {children}
  </span>
);

export default Span;

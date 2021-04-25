import React, { HTMLProps } from 'react';

import './Span.less';

export type SpanSize = 'normal' | 'small' | 'micro' | 'nano';

interface Props extends Omit<HTMLProps<HTMLSpanElement>, 'size'> {
  children: React.ReactNode;
  size?: SpanSize;
  bold?: boolean;
  italics?: boolean;
  uppercase?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  grow?: boolean;
  center?: boolean;
}

export const Span: React.SFC<Props> = ({
  children,
  size = 'normal',
  bold = false,
  italics = false,
  disabled = false,
  uppercase = false,
  className,
  id,
  grow,
  center,
  ...props
}) => (
  <span
    id={id}
    className={
      'Span' +
      (' Span-' + size) +
      (bold ? ' Span--bold' : '') +
      (italics ? ' Span--italics' : '') +
      (disabled ? ' Span--disabled' : '') +
      (uppercase ? ' Span--uppercase' : '') +
      (grow ? ' Span--grow' : '') +
      (center ? ' Span--center' : '') +
      (className ? ' ' + className : '')
    }
    {...props}
  >
    {children}
  </span>
);

import React from 'react';
import './A.less';

interface Props {
  children: React.ReactNode;
  className?: string;
  href: string;
  styled?: boolean;
  targetBlank?: boolean;
  disabled?: boolean;
  title?: string;
  onClick?: (any) => void;
}

export const A: React.FC<Props> = ({
  children,
  className,
  href,
  styled = true,
  targetBlank = false,
  onClick,
  disabled = false,
  title,
}) => (
  <a
    className={(styled ? 'A' : '') + (styled && disabled ? ' A-disabled' : '') + (className ? ' ' + className : '')}
    href={href}
    onClick={onClick}
    target={targetBlank ? '_blank' : '_self'}
    title={title}
  >
    {children}
  </a>
);

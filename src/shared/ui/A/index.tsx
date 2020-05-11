import React from 'react';
import { Link } from 'react-router-dom';

import './A.less';

interface Props {
  children: React.ReactNode;
  className?: string;
  href: string;
  frontend?: boolean;
  styled?: boolean;
  targetBlank?: boolean;
  disabled?: boolean;
  title?: string;
  onClick?: (any) => void;
}

const A: React.FC<Props> = ({
  children,
  className,
  href,
  frontend,
  styled = true,
  targetBlank = false,
  onClick,
  disabled = false,
  title,
}) => (
  <span
    className={(styled ? 'A' : '') + (styled && disabled ? ' A-disabled' : '') + (className ? ' ' + className : '')}
    onClick={onClick}
    title={title}
  >
    {href && !frontend && (
      <a href={href} target={targetBlank ? '_blank' : '_self'}>
        {children}
      </a>
    )}
    {href && frontend && (
      <Link to={href} target={targetBlank ? '_blank' : '_self'}>
        {children}
      </Link>
    )}
    {!href && <>{children}</>}
  </span>
);

export default A;

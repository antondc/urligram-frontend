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
}) => {
  const _className =
    (styled ? 'A' : '') + (styled && disabled ? ' A-disabled' : '') + (className ? ' ' + className : '');

  const target = targetBlank ? '_blank' : '_self';

  return (
    <>
      {href && !frontend && (
        <a className={_className} onClick={onClick} title={title} href={href} target={target}>
          {children}
        </a>
      )}
      {href && frontend && (
        <Link className={_className} onClick={onClick} title={title} to={href} target={target}>
          {children}
        </Link>
      )}
      {!href && (
        <span className={_className} onClick={onClick}>
          {children}
        </span>
      )}
    </>
  );
};

export default A;

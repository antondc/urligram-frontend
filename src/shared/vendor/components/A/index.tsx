import React from 'react';
import { Link } from 'react-router-dom';

import './A.less';

interface Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
  href: string;
  frontend?: boolean;
  active?: boolean;
  styled?: boolean;
  targetBlank?: boolean;
  disabled?: boolean;
  title?: string;
  underlined?: boolean;
  onClick?: (any) => void;
}

export const A: React.FC<Props> = ({
  children,
  id,
  className,
  href,
  frontend = false,
  styled = true,
  targetBlank = false,
  onClick,
  disabled = false,
  title,
  underlined = false,
  active,
}) => {
  const _className =
    (styled ? 'A' : 'A--default') +
    (className ? ' ' + className : '') +
    (styled && disabled ? ' A--disabled' : '') +
    (!styled && disabled ? ' A--noEvents' : '') +
    (styled && active ? ' ' + 'A--active' : '') +
    (styled && underlined ? ' ' + 'A--underlined' : '');

  const target = targetBlank ? '_blank' : '_self';

  return (
    <>
      {!frontend && (
        <a className={_className} id={id} onClick={onClick} title={title} href={href} target={target}>
          {children}
        </a>
      )}
      {frontend && (
        <Link className={_className} id={id} onClick={onClick} title={title} to={href} target={target}>
          {children}
        </Link>
      )}
    </>
  );
};

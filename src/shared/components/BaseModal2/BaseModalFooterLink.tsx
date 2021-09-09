import React, { HTMLProps } from 'react';

import A from 'Components/A';

import './BaseModalFooterLink.less';

interface Props extends HTMLProps<HTMLAnchorElement> {
  className?: string;
  href: string;
}

export const BaseModalFooterLink: React.FC<Props> = ({ children, className, href }) => (
  <A className={'BaseModalFooterLink' + (className ? ' ' + className : '')} href={href} styled={false}>
    {children}
  </A>
);

import React, { HTMLProps } from 'react';
import { useDispatch } from 'react-redux';

import A from 'Components/A';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';

import './BaseModalFooterLink.less';

interface Props extends HTMLProps<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export const BaseModalFooterLink: React.FC<Props> = ({ children, className, href }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(uiResetModalsState());
  };

  return (
    <A
      className={'BaseModalFooterLink' + (className ? ' ' + className : '')}
      href={href}
      styled={false}
      onClick={onClick}
    >
      {children}
    </A>
  );
};

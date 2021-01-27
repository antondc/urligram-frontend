import React from 'react';

import Logo from 'Assets/svg/logo.svg';
import User from 'Assets/svg/user.svg';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { A, Border, H3, H4 } from '@antoniodcorrea/components';

import './Header.less';

interface Props {
  isLogged: boolean;
  currentGlossary: GlossaryState;
  currentLanguageSlug: string;
  loading: boolean;
  switchUserModal: () => void;
  switchLoginModal: () => void;
}

export const Header: React.FC<Props> = ({
  isLogged,
  currentGlossary,
  switchUserModal,
  currentLanguageSlug,
  switchLoginModal,
  loading,
}) => (
  <header>
    <Border className="Header" weight="thick">
      <A className="Header-brand" href={'/' + currentLanguageSlug + '/'} frontend>
        <Logo className={'Header-logo' + (loading ? ' Header-logo--loading' : '')} />
        <H3 className="Header-title">Linking</H3>
      </A>

      <nav className="Header-navigation">
        <A className="Header-link" href={'/' + currentLanguageSlug + '/bookmarks?sort=-members&page[size]=10'} frontend>
          <H4>{currentGlossary.bookmarks}</H4>
        </A>
        <span className="Header-bar">|</span>
        <A className="Header-link" href={'/' + currentLanguageSlug + '/links'} frontend>
          <H4>{currentGlossary.links}</H4>
        </A>
        <span className="Header-bar">|</span>
        <A className="Header-link" href={'/' + currentLanguageSlug + '/users'} frontend>
          <H4>{currentGlossary.users}</H4>
        </A>
        <span className="Header-bar">|</span>
        <A className="Header-link" href={'/' + currentLanguageSlug + '/lists'} frontend>
          <H4>{currentGlossary.lists}</H4>
        </A>
      </nav>
      <div className="Header-user">
        <User
          name="User"
          className={'Header-userLogo' + (isLogged ? ' Header-userLogo--isActive' : '')}
          onClick={isLogged ? switchUserModal : switchLoginModal}
        />
      </div>
    </Border>
  </header>
);

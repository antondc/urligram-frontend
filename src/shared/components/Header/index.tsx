import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { logOut } from 'Modules/User/actions/logOut';
import { selectDefaultLanguageSlug } from '../../redux/modules/Languages/selectors/selectDefaultLanguageSlug';
import { selectLanguagesList } from '../../redux/modules/Languages/selectors/selectLanguagesList';
import { switchCurrentLanguage } from '../../redux/modules/Languages/actions/switchCurrentLanguage';
import { LanguageState } from '../../redux/modules/Languages/languages.types';
import { selectUserLoggedIn } from '../../redux/modules/User/selectors/selectUserLoggedIn';

import './Header.less';
import { selectCurrentLanguage } from '../../redux/modules/Languages/selectors/selectCurrentLanguage';

interface Props {
  isLogged: boolean;
  defaultLanguageSlug: string;
  languagesList: LanguageState[];
  currentLanguage: LanguageState;
  logOut: () => void;
  switchCurrentLanguage: (slug: string) => void;
}

const Header: React.FC<Props> = ({
  isLogged,
  defaultLanguageSlug,
  languagesList,
  currentLanguage,
  logOut,
  switchCurrentLanguage,
}) => (
  <header className={'Header'}>
    <nav className="Header-navigation">
      <Link className="Header-item" to={'/' + defaultLanguageSlug}>
        Home
      </Link>
      {isLogged && (
        <>
          <Link className="Header-item" to={'/' + defaultLanguageSlug + '/control'}>
            Control
          </Link>
          <Link className="Header-item" to={'/' + defaultLanguageSlug + '/login'} onClick={logOut}>
            Log out
          </Link>
        </>
      )}
      {!isLogged && (
        <Link className="Header-item" to={'/' + defaultLanguageSlug + '/login'}>
          Login
        </Link>
      )}
      <div className="Header-languages">
        {languagesList.map((item) => (
          <Link
            className={'Header-language' + (currentLanguage.slug === item.slug ? ' Header-languageActive' : '')}
            to=""
            key={item.id}
            onClick={() => {
              switchCurrentLanguage(item.slug);
            }}
          >
            {item.slug}
          </Link>
        ))}
      </div>
    </nav>
  </header>
);

const mapStateToProps = createStructuredSelector({
  defaultLanguageSlug: selectDefaultLanguageSlug,
  isLogged: selectUserLoggedIn,
  languagesList: selectLanguagesList,
  currentLanguage: selectCurrentLanguage,
});

export default connect(mapStateToProps, {
  logOut: logOut,
  switchCurrentLanguage: switchCurrentLanguage,
})(Header);

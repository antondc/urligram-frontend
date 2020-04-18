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
import { selectCurrentLanguage } from '../../redux/modules/Languages/selectors/selectCurrentLanguage';
import { selectCurrentRouteParamLanguage } from '../../redux/modules/Routes/selectors/selectCurrentRouteParamLanguage';
import { selectCurrentPathname } from '../../redux/modules/Routes/selectors/selectCurrentPathname';

import './Header.less';

interface Props {
  isLogged: boolean;
  defaultLanguageSlug: string;
  languagesList: LanguageState[];
  currentLanguage: LanguageState;
  currentRouteParamLanguage: string;
  currentPathname: string;
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
  currentRouteParamLanguage,
  currentPathname,
}) => {
  return (
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
          {languagesList.map((item) => {
            const link = !!currentRouteParamLanguage
              ? currentPathname.replace('/' + currentRouteParamLanguage, '/' + item.slug)
              : '/' + item.slug + currentPathname;

            return (
              <Link
                className={'Header-language' + (currentLanguage.slug === item.slug ? ' Header-languageActive' : '')}
                to={link}
                key={item.id}
                onClick={() => {
                  switchCurrentLanguage(item.slug);
                }}
              >
                {item.slug}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  defaultLanguageSlug: selectDefaultLanguageSlug,
  isLogged: selectUserLoggedIn,
  languagesList: selectLanguagesList,
  currentLanguage: selectCurrentLanguage,
  currentRouteParamLanguage: selectCurrentRouteParamLanguage,
  currentPathname: selectCurrentPathname,
});

export default connect(mapStateToProps, {
  logOut: logOut,
  switchCurrentLanguage: switchCurrentLanguage,
})(Header);

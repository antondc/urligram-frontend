import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { logOut } from 'Modules/User/actions/logOut';
import { selectLanguagesList } from 'Modules/Languages/selectors/selectLanguagesList';
import { switchCurrentLanguage } from 'Modules/Languages/actions/switchCurrentLanguage';
import { LanguageState } from 'Modules/Languages/languages.types';
import { selectUserLoggedIn } from 'Modules/User/selectors/selectUserLoggedIn';
import { selectCurrentLanguage } from 'Modules/Languages/selectors/selectCurrentLanguage';
import { selectCurrentRouteParamLanguage } from 'Modules/Routes/selectors/selectCurrentRouteParamLanguage';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname';

import './LanguagesSwitch.less';

interface Props {
  isLogged: boolean;
  languagesList: LanguageState[];
  currentLanguage: LanguageState;
  currentRouteParamLanguage: string;
  currentPathname: string;
  logOut: () => void;
  switchCurrentLanguage: (slug: string) => void;
}

const LanguagesSwitch: React.FC<Props> = ({
  languagesList,
  currentLanguage,
  switchCurrentLanguage,
  currentRouteParamLanguage,
  currentPathname,
}) => {
  const languagesWithLink = languagesList.map((item) => {
    const link = !!currentRouteParamLanguage
      ? currentPathname.replace('/' + currentRouteParamLanguage, '/' + item.slug)
      : '/' + item.slug + currentPathname;

    const isCurrent = currentLanguage.slug === item.slug;

    return { ...item, link, isCurrent };
  });

  return (
    <div className="LanguagesSwitch">
      {languagesWithLink.map((item) => {
        return (
          <Link
            className={'LanguagesSwitch-language' + (item.isCurrent ? ' LanguagesSwitch-languageActive' : '')}
            to={item.link}
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
  );
};

const mapStateToProps = createStructuredSelector({
  isLogged: selectUserLoggedIn,
  languagesList: selectLanguagesList,
  currentLanguage: selectCurrentLanguage,
  currentRouteParamLanguage: selectCurrentRouteParamLanguage,
  currentPathname: selectCurrentPathname,
});

export default connect(mapStateToProps, {
  logOut: logOut,
  switchCurrentLanguage: switchCurrentLanguage,
})(LanguagesSwitch);

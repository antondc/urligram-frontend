import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLanguagesList } from 'Modules/Languages/selectors/selectLanguagesList';
import { switchCurrentLanguage } from 'Modules/Languages/actions/switchCurrentLanguage';
import { switchLanguagesModal } from 'Modules/Ui/actions/switchLanguagesModal';
import { LanguageState } from 'Modules/Languages/languages.types';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectCurrentLanguage } from 'Modules/Languages/selectors/selectCurrentLanguage';
import { selectCurrentRouteParamLanguage } from 'Modules/Routes/selectors/selectCurrentRouteParamLanguage';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname';
import LanguageItem from '../LanguageItem';
import Border from '../../ui/Border';

import './LanguagesSwitch.less';

interface Props {
  isLogged: boolean;
  languagesList: LanguageState[];
  currentLanguage: LanguageState;
  currentRouteParamLanguage: string;
  currentPathname: string;
  switchLanguagesModal: () => void;
  switchCurrentLanguage: (slug: string) => void;
}

const LanguagesSwitch: React.FC<Props> = ({
  languagesList,
  currentLanguage,
  switchCurrentLanguage,
  switchLanguagesModal,
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
    <Border className="LanguagesSwitch" onClick={switchLanguagesModal}>
      {languagesWithLink
        .filter((item) => !item.isCurrent)
        .map((item) => {
          return (
            <LanguageItem
              key={item.id}
              lang={item.slug}
              href={item.link}
              isCurrent={item.isCurrent}
              onClick={() => {
                switchCurrentLanguage(item.slug);
              }}
            />
          );
        })}
      {languagesWithLink
        .filter((item) => item.isCurrent)
        .map((item) => {
          return (
            <LanguageItem
              key={item.id}
              lang={item.slug}
              href={item.link}
              isCurrent={item.isCurrent}
              onClick={() => {
                switchCurrentLanguage(item.slug);
              }}
            />
          );
        })}
    </Border>
  );
};

const mapStateToProps = createStructuredSelector({
  isLogged: selectSessionLoggedIn,
  languagesList: selectLanguagesList,
  currentLanguage: selectCurrentLanguage,
  currentRouteParamLanguage: selectCurrentRouteParamLanguage,
  currentPathname: selectCurrentPathname,
});

export default connect(mapStateToProps, {
  switchCurrentLanguage,
  switchLanguagesModal,
})(LanguagesSwitch);

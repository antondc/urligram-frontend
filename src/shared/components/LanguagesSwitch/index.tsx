import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LanguageItem from 'Components/LanguageItem';
import { Border } from 'Vendor/components';
import { switchCurrentLanguage } from 'Modules/Languages/actions/switchCurrentLanguage';
import { LanguageState } from 'Modules/Languages/languages.types';
import { selectCurrentLanguage } from 'Modules/Languages/selectors/selectCurrentLanguage';
import { selectLanguagesList } from 'Modules/Languages/selectors/selectLanguagesList';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname';
import { selectCurrentRouteParamLanguage } from 'Modules/Routes/selectors/selectCurrentRouteParamLanguage';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { switchLanguagesModal } from 'Modules/Ui/actions/switchLanguagesModal';

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
  const addLinkToLanguage = (language) => {
    const link = !!currentRouteParamLanguage
      ? currentPathname.replace('/' + currentRouteParamLanguage, '/' + language.slug)
      : '/' + language.slug + currentPathname;

    return { ...language, link };
  };

  const languagesWithLink = languagesList.map((language) => addLinkToLanguage(language));
  const currentLanguageWithLink = addLinkToLanguage(currentLanguage);
  const languagesWithoutCurrent = languagesWithLink.filter((item) => currentLanguage.slug !== item.slug);

  return (
    <Border className="LanguagesSwitch" onClick={switchLanguagesModal}>
      {languagesWithoutCurrent.map((item) => (
        <LanguageItem
          key={item.id}
          lang={item.slug}
          href={item.link}
          onClick={() => switchCurrentLanguage(item.slug)}
        />
      ))}

      <LanguageItem
        key={currentLanguageWithLink.id}
        lang={currentLanguageWithLink.slug}
        href={currentLanguageWithLink.link}
        isCurrent
        onClick={() => switchCurrentLanguage(currentLanguage.slug)}
      />
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

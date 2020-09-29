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
import LanguageItem from 'Components/LanguageItem';
import Border from 'Ui/Border';

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

    return { link, ...item };
  });
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
        key={currentLanguage.id}
        lang={currentLanguage.slug}
        href={currentLanguage.link}
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

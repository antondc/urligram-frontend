import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchLanguagesModal } from 'Modules/Ui/actions/switchLanguagesModal';
import { selectUiLanguagesModalMounted } from 'Modules/Ui/selectors/selectUiLanguagesModalMounted';
import { Footer as FooterUi } from './Footer';

import './Footer.less';

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const uiLanguagesModalMounted = useSelector(selectUiLanguagesModalMounted);
  const currentPathName = useSelector(selectCurrentPathname);
  const currentRoute = useSelector(selectCurrentRoute);

  const onLanguageItemClick = (): void => {
    dispatch(switchLanguagesModal());
  };

  return (
    <FooterUi
      className={className}
      session={session}
      onLanguageItemClick={onLanguageItemClick}
      currentLanguageSlug={currentLanguageSlug}
      uiLanguagesModalMounted={uiLanguagesModalMounted}
      currentPathName={currentPathName}
      currentRoute={currentRoute}
    />
  );
};

export default Footer;

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import A from 'Components/A';
import LanguageItem from 'Components/LanguageItem';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname';
import { switchLanguagesModal } from 'Modules/Ui/actions/switchLanguagesModal';
import { selectUiLanguagesModalMounted } from 'Modules/Ui/selectors/selectUiLanguagesModalMounted';
import { Border, Fade, Hr, Span } from '@antoniodcorrea/components';

import './Footer.less';

interface Props {
  currentLanguageSlug: string;
  uiLanguagesModalMounted: boolean;
  currentPathName: string;
  switchLanguagesModal: () => void;
}

const Footer: React.FC<Props> = ({
  currentLanguageSlug,
  uiLanguagesModalMounted,
  currentPathName,
  switchLanguagesModal,
}) => (
  <>
    <Hr spacer />
    <Border className="Footer" weight="thick">
      <div className="Footer-section">
        <A href="sign-up" frontend>
          <Span bold>Sign up</Span>
        </A>
      </div>
      <div className="Footer-section">
        <A href="about" frontend>
          <Span bold>About</Span>
        </A>
      </div>
      <div className="Footer-section">
        <A href="" frontend>
          <Span bold>Disclaimer</Span>
        </A>
      </div>
      <div className="Footer-section">
        <A href="" frontend>
          <Span bold>FAQ</Span>
        </A>
      </div>
      <div className="Footer-section">
        <A href="" frontend>
          <Span bold>Download</Span>
        </A>
      </div>
      <div className="Footer-section">
        <A href="" frontend>
          <Span bold>Contact</Span>
        </A>
      </div>
      <div className="Footer-section Footer-lastSection">
        <Fade mounted={uiLanguagesModalMounted}>
          <LanguagesSwitch />
        </Fade>
        <LanguageItem lang={currentLanguageSlug} onClick={switchLanguagesModal} href={currentPathName} />
      </div>
    </Border>
  </>
);

const mapStateToProps = createStructuredSelector({
  currentLanguageSlug: selectCurrentLanguageSlug,
  uiLanguagesModalMounted: selectUiLanguagesModalMounted,
  currentPathName: selectCurrentPathname,
});

export default connect(mapStateToProps, {
  switchLanguagesModal,
})(Footer);

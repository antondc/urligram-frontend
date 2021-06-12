import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import A from 'Components/A';
import LanguageItem from 'Components/LanguageItem';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { RouteState } from 'Modules/Routes/routes.types';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { switchLanguagesModal } from 'Modules/Ui/actions/switchLanguagesModal';
import { selectUiLanguagesModalMounted } from 'Modules/Ui/selectors/selectUiLanguagesModalMounted';
import { Routes } from 'Router/routes';
import { Fade, Frame, Span } from 'Vendor/components';

import './Footer.less';

interface Props {
  currentRoute: RouteState;
  currentLanguageSlug: string;
  uiLanguagesModalMounted: boolean;
  currentPathName: string;
  switchLanguagesModal: () => void;
}

const Footer: React.FC<Props> = ({
  currentRoute,
  currentLanguageSlug,
  uiLanguagesModalMounted,
  currentPathName,
  switchLanguagesModal,
}) => (
  <>
    <Frame className="Footer" borderTop={false}>
      <div className="Footer-section">
        <Span size="medium" weight="extraBold">
          <A
            className="Footer-link"
            href="sign-up"
            frontend
            underlined
            active={currentRoute?.name === Routes.Tags.name}
          >
            Sign up
          </A>
        </Span>
      </div>
      <div className="Footer-section">
        <Span size="medium" weight="extraBold">
          <A className="Footer-link" href="about" frontend underlined active={currentRoute?.name === Routes.About.name}>
            About
          </A>
        </Span>
      </div>
      <div className="Footer-section">
        <Span size="medium" weight="extraBold">
          <A className="Footer-link" href="" frontend underlined active={currentRoute?.name === undefined}>
            Disclaimer
          </A>
        </Span>
      </div>
      <div className="Footer-section">
        <Span size="medium" weight="extraBold">
          <A className="Footer-link" href="" frontend underlined active={currentRoute?.name === undefined}>
            FAQ
          </A>
        </Span>
      </div>
      <div className="Footer-section">
        <Span size="medium" weight="extraBold">
          <A className="Footer-link" href="" frontend underlined active={currentRoute?.name === undefined}>
            Download
          </A>
        </Span>
      </div>
      <div className="Footer-section">
        <Span size="medium" weight="extraBold">
          <A className="Footer-link" href="" frontend underlined active={currentRoute?.name === undefined}>
            Contact
          </A>
        </Span>
      </div>
      <div className="Footer-section Footer-lastSection">
        <Fade mounted={uiLanguagesModalMounted}>
          <LanguagesSwitch />
        </Fade>
        <LanguageItem lang={currentLanguageSlug} onClick={switchLanguagesModal} href={currentPathName} />
      </div>
    </Frame>
  </>
);

const mapStateToProps = createStructuredSelector({
  currentLanguageSlug: selectCurrentLanguageSlug,
  uiLanguagesModalMounted: selectUiLanguagesModalMounted,
  currentPathName: selectCurrentPathname,
  currentRoute: selectCurrentRoute,
});

export default connect(mapStateToProps, {
  switchLanguagesModal,
})(Footer);

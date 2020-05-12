import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectUiLanguagesModalMounted } from 'Modules/Ui/selectors/selectUiLanguagesModalMounted';
import { switchLanguagesModal } from 'Modules/Ui/actions/switchLanguagesModal';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname.ts';
import Border from 'Ui/Border';
import Input from 'Ui/Input';
import Span from 'Ui/Span';
import A from 'Ui/A';
import Hr from 'Ui/Hr';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import LanguageItem from 'Components/LanguageItem';
import Fade from 'Ui/Fade';

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
}) => {
  const [email, setEmail] = useState(undefined);
  const onInputType = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Border className="Footer">
      <div className="Footer-section" />
      <div className="Footer-section">
        <ul>
          <li>
            <A href="">
              <Span bold>FAQ</Span>
            </A>
            <Hr type="spacer" size="micro" />
          </li>
          <li>
            <A href="">
              <Span bold>My Account</Span>
            </A>
            <Hr type="spacer" size="micro" />
          </li>
        </ul>
      </div>
      <div className="Footer-section">
        <ul>
          <li>
            <A href="">
              <Span bold>Create account</Span>
            </A>
            <Hr type="spacer" size="micro" />
          </li>
          <li>
            <A href="">
              <Span bold>My Lists</Span>
            </A>
            <Hr type="spacer" size="micro" />
          </li>
        </ul>
      </div>
      <div className="Footer-section">
        <ul>
          <li>
            <A href="">
              <Span bold>Disclaimer</Span>
            </A>
            <Hr type="spacer" size="micro" />
          </li>
          <li>
            <A href="">
              <Span bold>Contact Us</Span>
            </A>
            <Hr type="spacer" size="micro" />
          </li>
        </ul>
      </div>
      <div className="Footer-section Footer-lastSection">
        <div className="Footer-languages" onMouseLeave={uiLanguagesModalMounted ? switchLanguagesModal : undefined}>
          <LanguageItem lang={currentLanguageSlug} onClick={switchLanguagesModal} href={currentPathName} />
          <Fade mounted={uiLanguagesModalMounted}>
            <LanguagesSwitch />
          </Fade>
        </div>
        <Input name="mailing" label="Sign up to our mailing list" value={email} onChange={onInputType} />
      </div>
    </Border>
  );
};

const mapStateToProps = createStructuredSelector({
  currentLanguageSlug: selectCurrentLanguageSlug,
  uiLanguagesModalMounted: selectUiLanguagesModalMounted,
  currentPathName: selectCurrentPathname,
});

export default connect(mapStateToProps, {
  switchLanguagesModal,
})(Footer);

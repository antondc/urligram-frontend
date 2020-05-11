import React, { useState } from 'react';
import Border from 'Ui/Border';
import Input from 'Ui/Input';
import Span from 'Ui/Span';
import A from 'Ui/A';
import Hr from 'Ui/Hr';
import Lang from 'Assets/svg/lang.svg';

import './Footer.less';

const Footer: React.FC = () => {
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
        <Lang className="Footer-lang" />
        <Input name="mailing" label="Sign up to our mailing list" value={email} onChange={onInputType} />
      </div>
    </Border>
  );
};

export default Footer;

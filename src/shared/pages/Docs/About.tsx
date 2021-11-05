import React from 'react';

import A from 'Components/A';

interface Props {
  domain: string;
  contactEmail: string;
  appName: string;
}

export const About: React.FC<Props> = ({ domain, contactEmail, appName }) => (
  <>
    <h2 className="Docs-h2" id="about">
      About
    </h2>
    <p className="Docs-paragraph">
      We are a small team of enthusiasts with different backgrounds and from different countries. Being familiar with IT
      landscape and the amount of information growing every day we like the basic and single use tools for basic
      universal needs.
    </p>
    <p className="Docs-paragraph">
      We spend much time in the internet getting in touch with great content. We may want to save and share this content
      but there is always a challenge how to make it and not loose the interesting link with the amount of data we see
      and exchange. Then we decided to create Linking, an online platform that allows users to store, share and manage
      URL resources.
    </p>
    <p className="Docs-paragraph">
      Linking provides a resource of knowledge in form of links, as well as a tool to manage them. The main elements of
      the platform are the users, the links, the tags and the lists. The intended interaction rely on browsing versus
      keyword search. So linking allows you to store the links and set the level of privacy you would like to, you can
      personalize the links putting your tags and comments and collecting the lists of bookmarks you would like to have
      together. As a social bookmarking tool linking enables your friends to share bookmarks with you and co-own the
      lists.
    </p>
    <p className="Docs-paragraph">
      Our mission is to enable you to enjoy the content you would like to at any moment with any device!
    </p>
    <h3 className="Docs-h3" id="contact">
      Contact
    </h3>
    <p className="Docs-paragraph">Please don’t hesitate to contact us at:</p>
    <p className="Docs-paragraph">{appName}</p>
    <p className="Docs-paragraph">
      <A className="Docs-link" href={`mailto:${contactEmail}`} styled={false}>
        {contactEmail}
      </A>
    </p>
    <p className="Docs-paragraph">
      <A className="Docs-link" href="/" styled={false}>
        {domain}
      </A>
    </p>
  </>
);

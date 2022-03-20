import React from 'react';

import A from 'Components/A';
import { FIREFOX_EXTENSION_URL } from 'Root/config.test.json';
import { Routes } from 'Router/routes';
import { Space } from '@antoniodcorrea/components';

export const FAQ: React.FC = () => (
  <div className="Docs-section" id="faq">
    <h2 className="Docs-h2">Frequently Asked Questions</h2>
    <h4 className="Docs-h4">What is Woprs?</h4>
    <p className="Docs-paragraph">
      Woprs is an online platform that allows users to store, share and manage URL resources. The goal is to provide a
      resource of knowledge in form of links, as well as a tool to manage them.
    </p>
    <p className="Docs-paragraph">
      The main elements of the platform are the users, the links, the tags and the lists.
    </p>
    <h4 className="Docs-h4">How does it work?</h4>
    <p className="Docs-paragraph">
      There are two ways to use Woprs: you can search and browse public bookmarks, lists and users in the database; or
      you can sign in, which allows you to save bookmarks, create lists and connect to other users. There are other
      functionalities that you would benefit from, as private bookmarks or lists.
    </p>
    <p className="Docs-paragraph">
      Woprs works as a website, but there is also an extension to save bookmarks without having Woprs site open: this is
      very convenient to save bookmarks while browsing. We currently have a version for Firefox 🦊, you can install it
      <Space />
      <a className="Docs-link" target="_blank" href={FIREFOX_EXTENSION_URL} rel="noreferrer">
        here
      </a>
      .
    </p>
    <h4 className="Docs-h4">Why shall I use it?</h4>
    <p className="Docs-paragraph">Woprs is a social bookmarking tool. We consider the main benefits of Woprs to be:</p>
    <ul className="Docs-ul">
      <li className="Docs-li">Store the links from all the browsers and devices.</li>
      <li className="Docs-li">Set your bookmarks and lists to be private or public.</li>
      <li className="Docs-li">Share your content with other users.</li>
    </ul>
    <p className="Docs-paragraph">
      With Woprs you will never loose that article you came across while browsing, and your friends wont have any excuse
      for not being aware of your birthday wishlist ;)
    </p>
    <h4 className="Docs-h4">How to sign up?</h4>
    <p className="Docs-paragraph">
      To sign up and become a user you should go to
      <Space />
      <A className="Docs-link" href={Routes.SignUp.route} styled={false}>
        sign up
      </A>
      <Space />
      page, click «Register» and introduce your data. We respect your privacy, and we do not link your email with other
      platforms, so you may use any name you prefer. To register you will only need a working email. To see all the
      benefits of being a user please go to User section.
    </p>
    <h4 className="Docs-h4">How to bookmark a page?</h4>
    <p className="Docs-paragraph">
      There are two main ways to add a bookmark: via the website and with the extension. In the website there are a
      specified button in the upper right side of the page with a «+» sign. To add a bookmark you will be asked to
      introduce the URL, description and tags. In most of the cases the description will be added automatically, which
      of course you can edit. After saving the bookmark it will appear in your Home page.
    </p>
    <h4 className="Docs-h4">How to share a bookmark?</h4>
    <p className="Docs-paragraph">
      Woprs gives you several instruments to manage and share your bookmarks. You can make your bookmarks public, so
      anyone —even non-logged users— will see it; but also you can save it as private. Also is possible to add tags in
      order to find bookmarks per topic, as well as create lists to group some bookmarks. As Woprs is a social
      bookmarking tool you can follow other users and share your bookmarks and lists with them.
    </p>
    <h4 className="Docs-h4">How to download the extension?</h4>
    <p className="Docs-paragraph">
      Currently we have the extension for Firefox 🦊: to install it please click
      <Space />
      <a className="Docs-link" target="_blank" href={FIREFOX_EXTENSION_URL} rel="noreferrer">
        here
      </a>
      . We are currently working on versions for Chrome and Edge, which we will release in the near future.
    </p>
    <h4 className="Docs-h4">Shall I pay to use Woprs?</h4>
    <p className="Docs-paragraph">Woprs is a free to use platform so far.</p>
    <h4 className="Docs-h4">How does privacy work in Woprs?</h4>
    <p className="Docs-paragraph">Yo are able to have completely private accounts.</p>
    <p className="Docs-paragraph">
      Bookmarks can be public or private. Private bookmarks are only visible to you, and don’t appear on any of the
      pages for other users.
    </p>
    <h4 className="Docs-h4">What about the data security in Woprs?</h4>
    <p className="Docs-paragraph">
      The safety of your data is crucial for Woprs. At any given time, there are one copy of your data in globally
      distributed data centers. If failure happens, there is an option to restore to any time in the previous 24h.
    </p>
  </div>
);

import React from 'react';

import A from 'Components/A';
import { Routes } from 'Router/routes';
import { Space } from '@antoniodcorrea/components';

interface Props {
  navigateToSection: (e: React.MouseEvent<HTMLElement>, hash: string) => void;
}

export const FAQ: React.FC<Props> = ({ navigateToSection }) => (
  <div className="Docs-section" id="faq">
    <h2 className="Docs-h2">Frequently Asked Questions</h2>
    <h4 className="Docs-h4">What is Urligram?</h4>
    <p className="Docs-paragraph">
      Urligram is an online platform that allows users to store, share and manage URL resources. The goal is to provide
      a resource of knowledge in form of links, as well as a tool to manage them.
    </p>
    <p className="Docs-paragraph">
      The main elements of the platform are the users, the links, the tags and the lists.
    </p>
    <h4 className="Docs-h4">How does it work?</h4>
    <p className="Docs-paragraph">
      There are two ways to use Urligram: you can search and browse public bookmarks, lists and users in the database;
      or you can sign in, which allows you to save bookmarks, create lists and connect to other users. There are other
      functionalities that you would benefit from, as private bookmarks or lists.
    </p>
    <p className="Docs-paragraph">
      There is also an extension to save bookmarks while browsing. Please see the{' '}
      <span className="Docs-link" onClick={(e) => navigateToSection(e, 'extension')}>
        Extension
      </span>{' '}
      section in this same page.
    </p>
    <h4 className="Docs-h4">Why shall I use it?</h4>
    <p className="Docs-paragraph">
      Urligram is a social bookmarking tool. We consider the main benefits of Urligram to be:
    </p>
    <ul className="Docs-ul">
      <li className="Docs-li">Store the links from all the browsers and devices.</li>
      <li className="Docs-li">Set your bookmarks and lists to be private or public.</li>
      <li className="Docs-li">Share your content with other users.</li>
    </ul>
    <p className="Docs-paragraph">
      With Urligram you will never loose that article you came across while browsing, and your friends won’t have any
      excuse for not being aware of your birthday wishlist ;)
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
      platforms, so you may use any name you prefer. To register you will only need a working email.
    </p>
    <h4 className="Docs-h4">How to bookmark a page?</h4>
    <p className="Docs-paragraph">
      There are two main ways to add a bookmark: via the website and with the extension. In the website there are a
      specified button in the upper right side of the page with a «+» sign. To add a bookmark you will be asked to
      introduce the URL, description and tags. In most of the cases the description will be added automatically, which
      of course you can edit. After saving the bookmark it will appear in your Home page.
    </p>
    <h4 className="Docs-h4">How many private bookmarks may I have?</h4>
    <p className="Docs-paragraph">
      A bookmark can be private or public. With the current basic account its possible to have any amount of private
      bookmarks up to 100 total bookmarks. When the user has more than 100 bookmarks, one out of every five has can be
      private. <br />
      This limit will not apply with the advanced account we have in development.
    </p>
    <h4 className="Docs-h4">How to share a bookmark?</h4>
    <p className="Docs-paragraph">
      Urligram gives you several instruments to manage and share your bookmarks. You can make your bookmarks public, so
      anyone —even non-logged users— will see it; but also you can save it as private. Also is possible to add tags in
      order to find bookmarks per topic, as well as create lists to group some bookmarks. As Urligram is a social
      bookmarking tool you can follow other users and share your bookmarks and lists with them.
    </p>
    <h4 className="Docs-h4">Shall I pay to use Urligram?</h4>
    <p className="Docs-paragraph">
      Currently Urligram offers a basic account. An advanced account model is on development, with benefits as unlimited
      private bookmarks and lists with advanced features.
    </p>
    <h4 className="Docs-h4">How does privacy work in Urligram?</h4>
    <p className="Docs-paragraph">Yo are able to have completely private accounts.</p>
    <p className="Docs-paragraph">
      Bookmarks are private by default. Private bookmarks are only visible to you, and don’t appear on any of the pages
      for other users. Also you can make some bookmarks public so other users may find them.
    </p>
    <h4 className="Docs-h4">What about the data security in Urligram?</h4>
    <p className="Docs-paragraph">
      The safety of your data is crucial for Urligram. At any given time, there are one copy of your data in globally
      distributed data centers. If failure happens, there is an option to restore to any time in the previous 24h.
    </p>
  </div>
);

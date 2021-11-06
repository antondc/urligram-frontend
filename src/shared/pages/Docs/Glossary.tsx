import React from 'react';

import './Docs.less';

export const Glossary: React.FC = () => (
  <div className="Docs-section" id="glossary">
    <h2 className="Docs-h2">Glossary</h2>
    <h4 className="Docs-h4" id="visitor">
      Visitor
    </h4>
    <ul className="Docs-ul">
      <li className="Docs-li">
        A visitor is a person that access to the website via the web or mobile interface, without logging in.
      </li>
      <li className="Docs-li">A visitor may become a user at any moment.</li>
    </ul>
    <h4 className="Docs-h4" id="user">
      User
    </h4>
    <ul className="Docs-ul">
      <li className="Docs-li">
        A user is a person that access to the website via the web or mobile interface, and is logged in.
      </li>
      <li className="Docs-li">A user can be related to many bookmarks.</li>
      <li className="Docs-li">A user can be related to many lists, owning, editing or following it.</li>
      <li className="Docs-li">A user can be related to many users, following them.</li>
      <li className="Docs-li">
        A visitor becomes a user after filling the registration form using the existing email address and a password.
        The form is situated at Register button in Log In area.
      </li>
      <li className="Docs-li">A user may be using the real name or a nick name.</li>
      <li className="Docs-li">A user may delete the account.</li>
      <li className="Docs-li">A user may use and change password, photo and username.</li>
    </ul>
    <h4 className="Docs-h4" id="link">
      Link
    </h4>
    <ul className="Docs-ul">
      <li className="Docs-li">
        The link is the representation of the URL in the database. Users are not aware of the concept of link: they only
        know about bookmarks
      </li>
      <li className="Docs-li">
        A link is a URL, also known as «resource». It is composed by the domain —grouping subdomain + domain if
        necessary—, and the path.
      </li>
    </ul>
    <h4 className="Docs-h4" id="bookmark">
      Bookmark
    </h4>
    <ul className="Docs-ul">
      <li className="Docs-li">A bookmark is a link saved by an user.</li>
      <li className="Docs-li">A bookmark can be related to tags.</li>
      <li className="Docs-li">A bookmark can be public or private.</li>
      <li className="Docs-li Docs-liSecondLevel">
        A private bookmark is only seen by the user that bookmarked it, except when is added to a private list: then all
        users within this list will see it.
      </li>
      <li className="Docs-li Docs-liSecondLevel">
        A public bookmark can be seen by all users. A public bookmark within a private list will still be seen by other
        users.
      </li>
      <li className="Docs-li">A bookmark can be imported from the browser.</li>
      <li className="Docs-li">A bookmark can be created and deleted at any moment.</li>
    </ul>
    <h4 className="Docs-h4" id="tag">
      Tag
    </h4>
    <ul className="Docs-ul">
      <li className="Docs-li">A tag is a noun that is related to a resource.</li>
      <li className="Docs-li">One tag can be related to many resources, and any resources can have many tags.</li>
    </ul>
    <h4 className="Docs-h4" id="list">
      List
    </h4>
    <ul className="Docs-ul">
      <li className="Docs-li">A list is a set of bookmarks.</li>
      <li className="Docs-li">
        The relationship between lists and users will be regulated by levels of access: admins, editors and readers.
      </li>
      <li className="Docs-li">
        The admin is able to set the public/private status of the list: «private» or «public».
      </li>
      <li className="Docs-li">The admin and the editor can be adding and deleting bookmarks to the list</li>
    </ul>
    <h4 className="Docs-h4" id="follower">
      Follower
    </h4>
    <ul className="Docs-ul">
      <li className="Docs-li">
        A follower is a user that listen to some specific actions of another user, e.g., the resources that another user
        adds to his lists.
      </li>
    </ul>
    <h4 className="Docs-h4" id="extension">
      Extension
    </h4>
    <ul className="Docs-ul">
      <li className="Docs-li">
        An extension is a special feature to be added to your browser so that the user can add the bookmark to linking
        through this feature.
      </li>
      <li className="Docs-li">The extension can be added to Chrome, Mozilla, Edge.</li>
      <li className="Docs-li">The extension opens as a form to be filled within the browser tab.</li>
    </ul>
  </div>
);

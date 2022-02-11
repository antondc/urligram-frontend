import React from 'react';

import A from 'Components/A';
import { Space } from '@antoniodcorrea/components';

interface Props {
  domain: string;
  contactEmail: string;
  appName: string;
}

export const Legal: React.FC<Props> = ({ domain, contactEmail, appName }) => (
  <div className="Docs-section" id="legal">
    <h2 className="Docs-h2">Legal</h2>
    <div id="disclaimer">
      <h3 className="Docs-h3">Disclaimer</h3>
      <p className="Docs-paragraph">
        This disclaimer —«Disclaimer»— sets forth the general guidelines, disclosures, and terms of your use of the
        <Space />
        <A className="Docs-link" href="/" styled={false}>
          {domain}
        </A>
        <Space />
        website, {appName} mobile application —«Mobile Application»— and any of their related products and services
        —collectively, «Services»—.
      </p>
      <p className="Docs-paragraph">
        This Disclaimer is a legally binding agreement between you —«User», «you» or «your»— and this Website operator
        and Mobile Application developer —«Operator», «we», «us» or «our»—.
      </p>
      <p className="Docs-paragraph">
        If you are entering into this agreement on behalf of a business or other legal entity, you represent that you
        have the authority to bind such entity to this agreement, in which case the terms «User», «you» or «your» shall
        refer to such entity.
      </p>
      <p className="Docs-paragraph">
        If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept
        this agreement and may not access and use the Services. By accessing and using the Services, you acknowledge
        that you have read, understood, and agree to be bound by the terms of this Disclaimer.
      </p>
      <p className="Docs-paragraph">
        You acknowledge that this Disclaimer is a contract between you and the Operator, even though it is electronic
        and is not physically signed by you,and it governs your use of the Services.
      </p>
      <h4 className="Docs-h4">Representation</h4>
      <p className="Docs-paragraph">
        Any views or opinions represented on the Services belong solely to the content creators and do not represent
        those of people,institutions or organizations that the Operator or creators may or may not be associated with in
        professional or personal capacity, unless explicitly stated.Any views or opinions are not intended to malign any
        religion, ethnic group,club, organization, company, or individual.
      </p>
      <h4 className="Docs-h4">Content and postings</h4>
      <p className="Docs-paragraph">
        Website is not responsible for any incorrect or inaccurate Content posted on the Website or in connection with
        the Services provided. Profiles created and posted by Users of the Website may contain links to other websites.
        The Website is not responsible for the Content, accuracy or opinions expressed on such websites, and such
        websites are in no way investigated, monitored or checked for accuracy or completeness by the Website.Inclusion
        of any linked website on the Website does not imply approval or endorsement of the linked website by the
        Website. When you access these third-party sites,you do so at your own risk.
      </p>
      <p className="Docs-paragraph">
        You may print or copy any part of the Services for your personal or non-commercial use.
      </p>
      <h4 className="Docs-h4">Compensation and sponsorship</h4>
      <p className="Docs-paragraph">
        Some of the links on the Services may be affiliate links. This means if you click on the link and purchase an
        item, the Operator will receive an affiliate commission.
      </p>
      <h4 className="Docs-h4">Indemnification and warranties</h4>
      <p className="Docs-paragraph">
        While we have made every attempt to ensure that the information contained on the Services is correct, the
        Operator is not responsible for any errors or omissions, or for the results obtained from the use of this
        information. All information on the Services is provided «as is»,with no guarantee of completeness, accuracy,
        timeliness or of the results obtained from the use of this information, and without warranty of any kind,express
        or implied. In no event will the Operator, or its partners, employees or agents, be liable to you or anyone else
        for any decision made or action taken in reliance on the information on the Services, or for any
        consequential,special or similar damages, even if advised of the possibility of such damages.Information
        contained on the Services are subject to change at any time and without warning.
      </p>
      <h4 className="Docs-h4">Changes and amendments</h4>
      <p className="Docs-paragraph">
        We reserve the right to modify this Disclaimer or its terms related to the Services at any time at our
        discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice
        to you in other ways at our discretion, such as through the contact information you have provided.
      </p>
      <p className="Docs-paragraph">
        An updated version of this Disclaimer will be effective immediately upon the posting of the revised Disclaimer
        unless otherwise specified. Your continued use of the Services after the effective date of the revised
        Disclaimer —or such other act specified at that time— will constitute your consent to those changes.
      </p>
      <h4 className="Docs-h4">Acceptance of this disclaimer</h4>
      <p className="Docs-paragraph">
        You acknowledge that you have read this Disclaimer and agree to all its terms and conditions. By accessing and
        using the Services you agree to be bound by this Disclaimer. If you do not agree to abide by the terms of this
        Disclaimer, you are not authorized to access or use the Services. This disclaimer was created with the
        disclaimer generator.
      </p>
      <h4 className="Docs-h4">Contacting us</h4>
      <p className="Docs-paragraph">
        If you have any questions, concerns, or complaints regarding this Disclaimer, we encourage you to contact us at
        <Space />
        <A className="Docs-link" href={`mailto:${contactEmail}`} styled={false}>
          {contactEmail}
        </A>
        .
      </p>
      <p className="Docs-paragraph">This document was last updated on December 11, 2021</p>
    </div>
    <div id="privacy-policy">
      <h3 className="Docs-h3">Privacy Policy</h3>
      <p className="Docs-paragraph">
        This Policy will explain how Woprs collects, uses and disclosure the personal data we collect from you when you
        use our website.
      </p>
      <p className="Docs-paragraph">
        We use your Personal Information for providing and improving the Services. By using the Service, you agree to
        the collection and use of information in accordance with this policy.
      </p>
      <p className="Docs-paragraph">
        You are able to use Woprs anonymously, the only data we collect is the working email address. Your email address
        is used for the following purposes: to send you information about updates of our services or to send you the
        password reset link in case of password lost.
      </p>
      <p className="Docs-paragraph">
        You can permanently delete your personal information from the database by deleting your account on the Account
        page.
      </p>
      <p className="Docs-paragraph">
        We may also collect information that your browser sends whenever you visit our Services —«Log Data»—. This Log
        Data may include information such as your computer’s Internet Protocol —«IP»— address, browser type, browser
        version, the pages of our Services that you visit, the time and date of your visit, the time spent on those
        pages and other statistics.
      </p>
      <p className="Docs-paragraph">
        Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent
        to your browser from a web site and stored on your browser’s memory.
      </p>
      <p className="Docs-paragraph">
        We use «cookies» to collect information. You can instruct your browser to refuse all cookies or to indicate when
        a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our
        Service. Once the session is closed the cookies will be removed.
      </p>
      <p className="Docs-paragraph">
        Our data centers are hosted by Amazon Web Services —AWS—. As such, they are continuously audited with
        certifications from accreditation bodies across geographies and verticals.
      </p>
      <p className="Docs-paragraph">
        Our Service may contain links to other sites that are not operated by us. If you click on a third party link,
        you will be directed to that third party’s site. We strongly advise you to review the Privacy Policy of every
        site you visit. We have no control over, and assume no responsibility for the content, privacy policies or
        practices of any third party sites or services.
      </p>
      <p className="Docs-paragraph">Woprs is not sharing user data with third parties.</p>
      <p className="Docs-paragraph">We would like to be sure you are aware of the data protection rights:</p>
      <ul className="Docs-ul">
        <li className="Docs-li">
          You have the right to request to Woprs the copies of your personal data and the right to correct any
          information you believe is inaccurate.
        </li>
        <li className="Docs-li">
          You have the right to request that Woprs erase your personal data, under certain conditions.
        </li>
        <li className="Docs-li">
          You have the right to object and restrict the processing of your personal data, under certain conditions.
        </li>
        <li className="Docs-li">
          You have the right to request that Woprs transfer the data that we have collected to another organization or
          directly to you.
        </li>
      </ul>
      <p className="Docs-paragraph">
        Woprs keeps its privacy policy under regular review and places any updates on this web page.
      </p>
      <p className="Docs-paragraph">
        If you have any questions regarding {appName} privacy policy please contact
        <Space />
        <A className="Docs-link" href={`mailto:${contactEmail}`} styled={false}>
          {contactEmail}
        </A>
        <Space />
      </p>
    </div>
  </div>
);

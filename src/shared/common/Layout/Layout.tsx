import React from 'react';

import LayoutHelperGrid from 'Common/LayoutHelperGrid';
import BookmarkCreateModalOrSheet from 'Components/BookmarkCreateModalOrSheet';
import BookmarkUpdateModalOrSheet from 'Components/BookmarkUpdateModalOrSheet';
import CookiesBanner from 'Components/CookiesBanner';
import Footer from 'Components/Footer';
import ForgotPasswordModal from 'Components/ForgotPasswordModal';
import Header from 'Components/Header';
import ListModal from 'Components/ListModal';
import LoginModal from 'Components/LoginModal';
import Notifications from 'Components/Notifications';
import ResetPasswordModal from 'Components/ResetPasswordModal';
import ScreenSizePixel from 'Components/ScreenSizePixel';
import SignUpModal from 'Components/SignUpModal';
import UserModal from 'Components/UserModal';
import WelcomeModal from 'Components/WelcomeModal';
import Router from 'Router/index';
import { Fade, Spinner } from '@antoniodcorrea/components';

import './Layout.less';

interface Props {
  loginModalMounted: boolean;
  signUpModalMounted: boolean;
  welcomeModalMounted: boolean;
  forgotPasswordModalMounted: boolean;
  resetPasswordModalMounted: boolean;
  listModalMounted: boolean;
  renderLoader: boolean;
}

export const Layout: React.FC<Props> = ({
  loginModalMounted,
  signUpModalMounted,
  welcomeModalMounted,
  forgotPasswordModalMounted,
  resetPasswordModalMounted,
  listModalMounted,
  renderLoader,
}) => (
  <div className="Layout">
    <ScreenSizePixel />
    <div className="Layout-background" />
    <div className="Layout-content">
      <LayoutHelperGrid />
      <Header />
      <CookiesBanner />
      <Router />
      <Footer />
    </div>
    <div className="Layout-modalsAndPortals">
      <UserModal />
      <Fade mounted={loginModalMounted} speed="fastest" position="fixed" appear>
        <LoginModal />
      </Fade>
      <Fade mounted={signUpModalMounted} speed="fastest" position="fixed" appear>
        <SignUpModal />
      </Fade>
      <Fade mounted={welcomeModalMounted} speed="fastest" position="fixed" appear>
        <WelcomeModal />
      </Fade>
      <Fade mounted={forgotPasswordModalMounted} speed="fastest" position="fixed" appear>
        <ForgotPasswordModal />
      </Fade>
      <Fade mounted={resetPasswordModalMounted} speed="fastest" position="fixed" appear>
        <ResetPasswordModal />
      </Fade>
      <BookmarkCreateModalOrSheet />
      <BookmarkUpdateModalOrSheet />
      <Fade mounted={listModalMounted} speed="fastest" position="fixed" appear>
        <ListModal />
      </Fade>
      <Notifications />
      <Fade mounted={renderLoader} speed="fastest" position="fixed" appear>
        <div className="Layout-loader">
          <Spinner className="Layout-loaderIcon" size="huge" />
        </div>
      </Fade>
      <div id="Tooltips" />
      <div id="Portals" />
    </div>
  </div>
);

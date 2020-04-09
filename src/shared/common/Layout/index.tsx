import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Main from '../../routes/Main';
import Fade from '../Fade/Fade';
import Loader from '../Loader';
import './Layout.less';

interface Props {
  loading: boolean;
}

const Layout: React.FC<Props> = ({ loading }) => {
  if (isBrowser) {
    window.addEventListener('load', () => {
      document.body.classList.remove('preload'); // Preventing animations on load
      document.body.classList.add('isLoaded'); // Showing page on load
    });
  }

  return (
    <div className={'Layout'}>
      <div className="Layout-modal">
        <Fade time={150} mounted={loading}>
          <Loader />
        </Fade>
      </div>
      <div className="Layout-content">
        <Header />
        <Route path="/:lang([a-z]{2})?" component={Main} />
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.MockDataTwo.loading,
});

export default connect(mapStateToProps)(Layout);

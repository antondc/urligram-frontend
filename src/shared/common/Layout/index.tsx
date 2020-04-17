import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLanguageLoading } from '../../redux/modules/Languages/selectors/selectLanguageLoading';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import Main from 'Routes/Main';
import Fade from 'Common/Fade/Fade';
import { selectMockDataTwoLoading } from '../../redux/modules/MockDataTwo/selectors/selectMockDataTwoLoading';
import { SpinnerCircle } from '@antoniodcorrea/components';
import './Layout.less';

interface Props {
  languagesLoading: boolean;
  mockDataTwoLoading: boolean;
  location: any;
}

class Layout extends React.Component<Props> {
  componentDidMount() {
    if (isBrowser) {
      window.addEventListener('load', () => {
        document.body.classList.remove('preload'); // Preventing animations on load
        document.body.classList.add('isLoaded'); // Showing page on load
      });
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.location !== prevProps.location) {
      // trigger new location push on Redux actions
    }
  };

  render = () => {
    const { languagesLoading, mockDataTwoLoading } = this.props;
    const showLoader = languagesLoading || mockDataTwoLoading;

    return (
      <div className={'Layout'}>
        <div className="Layout-modal">
          <Fade time={150} mounted={showLoader}>
            <SpinnerCircle />
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
}

const mapStateToProps = createStructuredSelector({
  languagesLoading: selectLanguageLoading,
  mockDataTwoLoading: selectMockDataTwoLoading,
});

export default connect(mapStateToProps, {})(Layout);

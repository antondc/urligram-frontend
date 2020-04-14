import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadMockDataTwo } from 'Modules/MockDataTwo/actions/loadMockDataTwo';
import { selectMockDataTwoUpdatedAt } from '../../redux/modules/MockDataTwo/selectors/selectMockDataTwoUpdatedAt';
import { selectDefaultLanguage } from '../../redux/modules/Languages/selectors/selectDefaultLanguage';
import { H1, Border, Button, Span, Layout, P } from '@antoniodcorrea/components';
import './Home.less';

interface Props {
  updatedAt: string;
  defaultLanguage: {};
  loadMockDataTwo: () => void;
}

const Home: React.FC<Props> = ({ updatedAt, loadMockDataTwo, defaultLanguage }) => {
  return (
    <div className="Home">
      <Border grow>
        <Layout horizontal="center">
          <H1 center grow>
            HOME PAGE
          </H1>
          {updatedAt && (
            <Span grow center>
              Updated at: {updatedAt}
            </Span>
          )}
          <Button text="Load Mock Data Two" onClick={loadMockDataTwo} />
          <Span grow center>
            {JSON.stringify(defaultLanguage)}
          </Span>
        </Layout>
      </Border>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  updatedAt: selectMockDataTwoUpdatedAt,
  defaultLanguage: selectDefaultLanguage,
});

export default connect(mapStateToProps, {
  loadMockDataTwo: loadMockDataTwo,
})(Home);

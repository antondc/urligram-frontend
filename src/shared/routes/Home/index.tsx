import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadMockDataTwo } from 'Modules/MockDataTwo/actions/loadMockDataTwo';
import { selectMockDataTwoUpdatedAt } from '../../redux/modules/MockDataTwo/selectors/selectMockDataTwoUpdatedAt';
import { selectDefaultLanguage } from '../../redux/modules/Languages/selectors/selectDefaultLanguage';
import { selectCurrentLanguage } from '../../redux/modules/Languages/selectors/selectCurrentLanguage';
import { LanguageState } from '../../redux/modules/Languages/languages.types';
import { H1, Border, Button, Span, Layout, Hr } from '@antoniodcorrea/components';

import './Home.less';

interface Props {
  updatedAt: string;
  defaultLanguage: {};
  currentLanguage: LanguageState;
  loadMockDataTwo: () => void;
}

const Home: React.FC<Props> = ({ updatedAt, loadMockDataTwo, defaultLanguage, currentLanguage }) => {
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
          <Hr type="spacer" />
          <Button text="Load Mock Data Two" onClick={loadMockDataTwo} />
          <Hr type="spacer" />
          <Span grow center>
            {JSON.stringify(defaultLanguage)}
          </Span>
          <Hr type="spacer" />
          <Span bold> Current language is: {currentLanguage.name}</Span>
          <Hr type="spacer" />
        </Layout>
      </Border>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  updatedAt: selectMockDataTwoUpdatedAt,
  defaultLanguage: selectDefaultLanguage,
  currentLanguage: selectCurrentLanguage,
});

export default connect(mapStateToProps, {
  loadMockDataTwo: loadMockDataTwo,
})(Home);

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadMockDataTwo } from 'Modules/MockDataTwo/actions/loadMockDataTwo';
import { selectMockDataTwoUpdatedAt } from 'Modules/MockDataTwo/selectors/selectMockDataTwoUpdatedAt';
import { selectDefaultLanguage } from 'Modules/Languages/selectors/selectDefaultLanguage';
import { selectCurrentLanguage } from 'Modules/Languages/selectors/selectCurrentLanguage';
import { LanguageState } from 'Modules/Languages/languages.types';
import { H1, Border, Button, Span, Flex, Hr } from '@antoniodcorrea/components';
import { selectCurrentGlossary } from '../../redux/modules/Languages/selectors/selectCurrentGlossary';
import { GlossaryState } from '../../redux/modules/Languages/languages.types';

import './Home.less';

interface Props {
  updatedAt: string;
  defaultLanguage: {};
  currentLanguage: LanguageState;
  currentGlossary: GlossaryState;
  loadMockDataTwo: () => void;
}

const Home: React.FC<Props> = ({ updatedAt, loadMockDataTwo, defaultLanguage, currentLanguage, currentGlossary }) => {
  return (
    <div className="Home">
      <Border grow>
        <Flex horizontal="center">
          <H1 center grow>
            {currentGlossary.Home}
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
        </Flex>
      </Border>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  updatedAt: selectMockDataTwoUpdatedAt,
  defaultLanguage: selectDefaultLanguage,
  currentLanguage: selectCurrentLanguage,
  currentGlossary: selectCurrentGlossary,
});

export default connect(mapStateToProps, {
  loadMockDataTwo: loadMockDataTwo,
})(Home);

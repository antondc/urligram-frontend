import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadMockDataTwo } from 'Modules/MockDataTwo/actions/loadMockDataTwo';
import { selectMockDataTwoUpdatedAt } from 'Modules/MockDataTwo/selectors/selectMockDataTwoUpdatedAt';
import { selectCurrentLanguage } from 'Modules/Languages/selectors/selectCurrentLanguage';
import { LanguageState } from 'Modules/Languages/languages.types';
import { H1, Button, Span, Flex, Hr, P } from '@antoniodcorrea/components';
import { selectCurrentGlossary } from 'Redux/modules/Languages/selectors/selectCurrentGlossary';
import { GlossaryState } from 'Redux/modules/Languages/languages.types';
import Sidebar from 'Components/Sidebar';

import './Home.less';
import Main from '../../components/Main';

interface Props {
  updatedAt: string;
  currentLanguage: LanguageState;
  currentGlossary: GlossaryState;
  loadMockDataTwo: () => void;
}

const Home: React.FC<Props> = ({ updatedAt, loadMockDataTwo, currentLanguage, currentGlossary }) => {
  return (
    <div className="Home">
      <Flex horizontal="between" vertical="top">
        <Sidebar>Sidebar left</Sidebar>
        <Main>
          <H1 center grow>
            {currentGlossary.Home}
          </H1>
          <Span grow center>
            Updated at: {updatedAt && updatedAt}
          </Span>
          <Hr type="spacer" />
          <Span bold> Current language is: {currentLanguage.name}</Span>
          <Hr type="spacer" />
          <Button text="Load Mock Data Two" onClick={loadMockDataTwo} />
          <Hr type="spacer" />
          <P>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, excepturi. Ipsam rem necessitatibus vel,
            exercitationem nobis numquam sed deleniti molestias totam laboriosam dolorem iusto tempore eum quae, iure
            assumenda omnis?
          </P>
          <P>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, excepturi. Ipsam rem necessitatibus vel,
            exercitationem nobis numquam sed deleniti molestias totam laboriosam dolorem iusto tempore eum quae, iure
            assumenda omnis?
          </P>
          <P>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, excepturi. Ipsam rem necessitatibus vel,
            exercitationem nobis numquam sed deleniti molestias totam laboriosam dolorem iusto tempore eum quae, iure
            assumenda omnis?
          </P>
        </Main>
        <Sidebar>Sidebar Right</Sidebar>
      </Flex>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  updatedAt: selectMockDataTwoUpdatedAt,
  currentLanguage: selectCurrentLanguage,
  currentGlossary: selectCurrentGlossary,
});

export default connect(mapStateToProps, {
  loadMockDataTwo: loadMockDataTwo,
})(Home);

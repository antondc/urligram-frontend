import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlossaryState } from '../../redux/modules/Languages/languages.types';
import { selectCurrentGlossary } from '../../redux/modules/Languages/selectors/selectCurrentGlossary';

import './NotFound.less';

interface Props {
  currentGlossary: GlossaryState;
}

const NotFound: React.FC<Props> = ({ currentGlossary }) => (
  <div className="NotFound">
    <h1 className="NotFound-h1">{currentGlossary.notFound}</h1>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentGlossary: selectCurrentGlossary,
});

export default connect(mapStateToProps, {})(NotFound);

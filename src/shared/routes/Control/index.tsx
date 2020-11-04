import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlossaryState } from '../../redux/modules/Languages/languages.types';
import { selectCurrentGlossary } from '../../redux/modules/Languages/selectors/selectCurrentGlossary';

import './Control.less';

interface Props {
  currentGlossary: GlossaryState;
}

const Control: React.FC<Props> = ({ currentGlossary }) => (
  <div className="Control">
    <h1 className="Control-h1">{currentGlossary.Control}</h1>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentGlossary: selectCurrentGlossary,
});

export default connect(mapStateToProps, {})(Control);

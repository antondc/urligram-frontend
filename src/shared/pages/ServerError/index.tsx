import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlossaryState } from 'Modules/Languages/languages.types';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';

import './ServerError.less';

interface Props {
  currentGlossary: GlossaryState;
}

const ServerError: React.FC<Props> = ({ currentGlossary }) => (
  <div className="ServerError">
    <h1 className="ServerError-h1">{currentGlossary.serverError}</h1>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentGlossary: selectCurrentGlossary,
});

export default connect(mapStateToProps, {})(ServerError);

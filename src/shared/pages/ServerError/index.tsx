import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlossaryState } from 'Modules/Languages/languages.types';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { SITE_TITLE } from 'Root/src/shared/constants';

import './ServerError.less';

interface Props {
  currentGlossary: GlossaryState;
}

const ServerError: React.FC<Props> = ({ currentGlossary }) => (
  <>
    <Helmet title={`${SITE_TITLE} · 500 Server Error`} />
    <div className="ServerError">
      <h1 className="ServerError-h1">{currentGlossary?.serverError}</h1>
    </div>
  </>
);

const mapStateToProps = createStructuredSelector({
  currentGlossary: selectCurrentGlossary,
});

export default connect(mapStateToProps, {})(ServerError);

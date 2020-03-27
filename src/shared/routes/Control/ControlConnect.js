import { connect } from 'react-redux';
import ControlUi from './ControlUi';

export const ControlConnect = connect(
  (state, { match }) => {
    return {};
  },
  dispatch => {
    return {};
  }
)(ControlUi);

export default ControlConnect;

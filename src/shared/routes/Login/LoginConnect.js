import { connect } from 'react-redux';
import LoginUi from './LoginUi';
import actions from '../../redux/actions';
import { withRouter } from 'react-router';

export const LoginConnect = connect(
  state => {
    return {
      UserSession: state.UserSession,
    };
  },
  dispatch => {
    return {
      requestToken(username, password, history) {
        dispatch(actions.requestToken(username, password, history));
      },
    };
  }
)(LoginUi);

export default withRouter(LoginConnect);

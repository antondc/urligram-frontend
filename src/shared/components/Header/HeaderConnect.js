import { connect } from 'react-redux';
import HeaderUi from './HeaderUi';
import actions from '../../redux/actions';

export const HeaderConnect = connect(
  (state, { match }) => {
    return {
      Language: state.Language,
      NavigatedRoute: state.NavigatedRoute,
      UserSession: state.UserSession,
    };
  },
  dispatch => {
    return {
      logOut(history) {
        // dispatch(actions.logOut(history));
      },
    };
  }
)(HeaderUi);

export default HeaderConnect;

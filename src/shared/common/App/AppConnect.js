import { connect } from 'react-redux';
import actions from '../../redux/actions';
import AppUi from './AppUi';

export const AppConnect = connect(
  state => {
    return {
      Saving: state.Saving,
      NavigatedRoute: state.NavigatedRoute,
    };
  },
  dispatch => {
    return {};
  }
)(AppUi);

export default AppConnect;

import { connect } from 'react-redux';
import MainUi from './MainUi';
// import actions from '../../redux/actions';

export const MainConnect = connect(
  state => {
    return {
      Language: state.Language,
      Languages: state.Languages,
    };
  },
  dispatch => {
    return {};
  }
)(MainUi);

export default MainConnect;

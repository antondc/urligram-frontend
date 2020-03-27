import { connect } from 'react-redux';
import HomeUi from './HomeUi';
import actions from '../../redux/actions';

export const Home = connect(
  state => {
    return {
      FirstLoad: state.FirstLoad,
      Item: state.Item,
      Language: state.Language,
      HomePage: state.HomePage,
      NavigatedRoute: state.NavigatedRoute,
    };
  },
  dispatch => {
    return {
      firstLoad() {
        dispatch(actions.firstLoad());
      },
      setNavigatedRoute(params) {
        dispatch(actions.setNavigatedRoute(params));
      },
    };
  }
)(HomeUi);

export default Home;

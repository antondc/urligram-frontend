import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../redux/modules/User/actions/logOut';
import './Header.less';

interface Props {
  isLogged: boolean;
  Language: {
    slug: string;
  };
  logOut: () => void;
}

const Header: React.FC<Props> = ({ isLogged, Language: { slug }, logOut }) => (
  <header className={'Header'}>
    <nav className="Header-navigation">
      <Link className="Header-item" to={'/' + slug}>
        Home
      </Link>
      {isLogged && (
        <>
          <Link className="Header-item" to="/control">
            Control
          </Link>
          <Link className="Header-item" to="/login" onClick={logOut}>
            Log out
          </Link>
        </>
      )}
      {!isLogged && (
        <Link className="Header-item" to={'/' + slug + '/login'}>
          Login
        </Link>
      )}
    </nav>
  </header>
);

const mapStateToProps = (state) => ({
  Language: state.Languages,
  isLogged: !!state.User.id,
});

export default connect(mapStateToProps, {
  logOut: logOut,
})(Header);

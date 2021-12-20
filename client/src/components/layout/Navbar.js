import React, { Fragment, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ tittle, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href='/login' onClick={onLogout}>
          <i className='fas fa-sign-out-alt' />
          <span className='hide-sm'>Logout</span>{' '}
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} />
        {tittle}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  tittle: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  tittle: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;

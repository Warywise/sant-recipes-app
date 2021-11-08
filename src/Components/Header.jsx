import React from 'react';

import PropTypes from 'prop-types';

import Button from './Button';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ children, disabledSearch }) {
  const btnSearch = (
    <section className="search-container">
      <Button
        dataTestId="search-top-btn"
        display={ disabledSearch }
        src={ searchIcon }
      >
        <img src={ searchIcon } alt="Profile Icon" />
      </Button>
    </section>
  );

  return (
    <div className="header">
      <section className="perfil-container">
        <Button
          dataTestId="profile-top-btn"
          src={ profileIcon }
        >
          <img src={ profileIcon } alt="Profile Icon" />
        </Button>
      </section>

      <section className="title-page-container">
        <h1 className="title-page" data-testid="page-title">
          { children }
        </h1>
      </section>
      { !disabledSearch && btnSearch }
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
  disabledSearch: PropTypes.bool,
};

Header.defaultProps = {
  disabledSearch: false,
};

export default Header;

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { BiUser, BiSearchAlt2 } from 'react-icons/bi';

import Button from './Button';
import SearchBar from './SearchBar';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import '../Styles/Header.css';

function Header({ children, disabledSearch }) {
  const [redirectProfile, setRedirectProfile] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const btnSearch = () => (
    <Button
      className="header-btns show-search-btn"
      dataTestId="search-top-btn"
      display={ disabledSearch }
      src={ searchIcon }
      onClick={ () => setShowSearchBar(!showSearchBar) }
    >
      <BiSearchAlt2 size="2.3em" />
    </Button>
  );

  return (
    <header className="header">
      { redirectProfile && <Redirect to="/perfil" /> }

      {/* <div className="header-content"> */}
      <Button
        className="header-btns profile-btn"
        dataTestId="profile-top-btn"
        onClick={ () => setRedirectProfile(true) }
        src={ profileIcon }
      >
        <BiUser size="2.3em" />
      </Button>
      <h1 className="title-page" data-testid="page-title">
        { children }
      </h1>
      {/* </div> */}
      { !disabledSearch && btnSearch() }

      { showSearchBar && <SearchBar textFilterPage={ children } /> }
    </header>
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

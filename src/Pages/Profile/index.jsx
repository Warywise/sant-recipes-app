import React, { useEffect, useState } from 'react';

import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

import './styles/Profile.css';

import Button from '../../Components/Button';

import { GetLocalStorage } from '../../Helper/ToLocalStorage';

function Profile() {
  const [email, setEmail] = useState();

  useEffect(() => {
    const user = GetLocalStorage('user');
    setEmail(user ? user.email : '');
  }, []);

  function clearLocalStorage() {
    localStorage.clear();
  }

  return (
    <main className="main-profile">
      <Header
        disabledSearch
      >
        Profile
      </Header>

      <section className="profile-content">
        <h5 data-testid="profile-email">{ email }</h5>

        <div className="links-container">
          <Button
            dataTestId="profile-done-btn"
            hasLink="/receitas-feitas"
          >
            Done Recipes
          </Button>

          <Button
            dataTestId="profile-favorite-btn"
            hasLink="/receitas-favoritas"
          >
            Favorite Recipes
          </Button>

          <Button
            className="logout"
            dataTestId="profile-logout-btn"
            onClick={ clearLocalStorage }
            hasLink="/"
          >
            Logout
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Profile;

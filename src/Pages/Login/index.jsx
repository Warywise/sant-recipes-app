import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Modal } from 'reactstrap';

import { MyContext } from '../../Context/MyContext';
import DefaultInput from '../../Components/DefaultInput';

import { ToLocalStorage } from '../../Helper/ToLocalStorage';

import './styles/Login.css';

function Login() {
  const RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const length = 6;
  const INITIAL_STATE = { email: '', password: '', login: false };

  const { user, setUser, createLocalStorageKeys } = useContext(MyContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState(INITIAL_STATE);
  const { email, password, login } = state;

  function validation() {
    return RegExp.test(email) && password.length > length;
  }

  function handleChange({ target: { name, value } }) {
    setState({ ...state, [name]: value });
  }

  function handleClick() {
    ToLocalStorage('mealsToken', 1, 'cocktailsToken', 1);
    ToLocalStorage('user', { email });
    setUser({ ...user, email });
    setState({ ...state, login: true });
    createLocalStorageKeys();
  }

  return (
    <main className="login">
      { login && <Redirect to="/comidas" /> }
      <h1 className="login-page-name">ThreeMeals</h1>
      <form className="login-form">
        <h4>Login</h4>
        <DefaultInput
          type="text"
          id="email-input"
          name="email"
          value={ email }
          onChange={ handleChange }
          placeholder="Email"
          className={ RegExp.test(email)
            ? 'login-input login-check' : 'login-input' }
        />
        <DefaultInput
          type="password"
          id="password-input"
          name="password"
          value={ password }
          onChange={ handleChange }
          placeholder="Password"
          className={ password.length > length
            ? 'login-input login-check' : 'login-input' }
        />
        <p>Forgot Password?</p>
        <Button
          color="primary"
          className="button"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validation() }
          onClick={ handleClick }
        >
          Log In
        </Button>
        <p>
          { 'Don\'t have an account? ' }
          <Button color="link" onClick={ () => setModalOpen(true) }>Signup Now.</Button>
        </p>
      </form>
      <Modal centered isOpen={ modalOpen } toggle={ () => setModalOpen(false) }>
        <article className="login-modal-box">
          <h3>Não é necessário se cadastrar. 🤫</h3>
          <p>
            Você pode fazer login diretamente.
            Utilize um e-mail em formato válido e uma senha com mais de 6 caracteres
          </p>
          <code>Ex: email@example.com | @123456</code>

          <span className="login-modal-divider" />
          <Button
            color="primary"
            onClick={ () => setModalOpen(false) }
          >
            Fechar
          </Button>
        </article>
      </Modal>
    </main>
  );
}

export default Login;

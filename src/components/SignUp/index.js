import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import {FirebaseContext} from '../Firebase/index';
 
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

function SignUpForm() {
  let history = useHistory();
  const firebase = useContext(FirebaseContext);
  const [credentials, setCredentials] = useState(INITIAL_STATE);
 
  const onSubmit = event => {
    const { username, email, passwordOne } = credentials;
 
    firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        setCredentials({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setCredentials({ error });
      });
 
    event.preventDefault();
  }
 
  const onChange = event => {
    setCredentials({ [event.target.name]: event.target.value });
  };

  const isInvalid =
    credentials.passwordOne !== credentials.passwordTwo ||
    credentials.passwordOne === '' ||
    credentials.email === '' ||
    credentials.username === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={credentials.username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={credentials.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={credentials.passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={credentials.passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {credentials.error && <p>{credentials.error.message}</p>}
    </form>
  );
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;
 
export { SignUpForm, SignUpLink };
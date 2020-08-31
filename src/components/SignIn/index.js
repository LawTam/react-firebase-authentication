import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
 
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget'

import * as ROUTES from '../../constants/routes';
import {FirebaseContext} from '../Firebase/index';
 
const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
    
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
function SignInForm() {
  let history = useHistory();
  const firebase = useContext(FirebaseContext);
  const [credentials, setCredentials] = useState(INITIAL_STATE);
 
  const onSubmit = event => {
    const { email, password } = credentials;
    
    firebase.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setCredentials({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setCredentials({ error });
      });
 
    event.preventDefault();
  };
 
  const onChange = event => {
    setCredentials({ [event.target.name]: event.target.value });
  };
  
  const isInvalid = credentials.password === '' || credentials.email === '';
 
  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={credentials.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={credentials.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {credentials.error && <p>{credentials.error.message}</p>}
    </form>
  );
}
 
export default SignInPage;

export { SignInForm };
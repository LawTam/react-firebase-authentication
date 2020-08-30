import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  error: null,
};
 
function PasswordForgetForm() {
  const firebase = useContext(FirebaseContext);
  const[credentials, setCredentials] = useState(null);
 
  const onSubmit = event => {
 
    firebase.doPasswordReset(credentials.email)
      .then(() => {
        setCredentials({ ...INITIAL_STATE });
      })
      .catch(error => {
        setCredentials({ error });
      });
 
    event.preventDefault();
  };
 
  const onChange = event => {
    setCredentials({ [credentials.event.target.name]: credentials.event.target.value });
  };
 
  const isInvalid = credentials.email === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={credentials.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {credentials.error && <p>{credentials.error.message}</p>}
    </form>
  )
}
 
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
 
export default PasswordForgetPage;
 
export { PasswordForgetForm, PasswordForgetLink }
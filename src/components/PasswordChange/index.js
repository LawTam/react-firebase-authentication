import React, { useContext, useState } from 'react';
 
import { FirebaseContext } from '../Firebase';
 
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

function PasswordChangeForm() {
  const firebase = useContext(FirebaseContext);
  const[credentials, setCredentials] = useState(null);
 
  const onSubmit = event => {
    firebase.doPasswordUpdate(credentials.passwordOne)
      .then(() => {
        setCredentials({ ...INITIAL_STATE });
      })
      .catch(error => {
        setCredentials({ error });
      });
 
    event.preventDefault();
  };
 
  const onChange = event => {
    setCredentials({ [event.target.name]: event.target.value });
  };
 
  const isInvalid =
    credentials.passwordOne !== credentials.passwordTwo || credentials.passwordOne === '';
 
  return (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        value={credentials.passwordOne}
        onChange={onChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={credentials.passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {credentials.error && <p>{credentials.error.message}</p>}
    </form>
  );
}
 
export default PasswordChangeForm;
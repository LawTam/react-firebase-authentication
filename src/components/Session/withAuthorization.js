import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';

function withAuthorization(condition) {
  let history = useHistory();
  const firebase = useContext(FirebaseContext);

  useEffect( () => {
    this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        if (!condition(authUser)) {
          history.push(ROUTES.SIGN_IN);
        }
      }
    )
  }, [firebase.auth]);

}

export default withAuthorization;
import React from 'react';
 
import { withAuthorization } from '../Session';
 
const Home = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);
 
const condition = authUser => authUser != null;
 
// short version
//const condition = authUser => !!authUser;

// role-based authorization
//const condition = authUser => authUser.role === 'ADMIN';
 
// permission-based authorization
//const condition = authUser => authUser.permissions.canEditAccount;
 
export default withAuthorization(condition)(Home);
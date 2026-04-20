import React from 'react';
import './App.css';
import { auth } from './firebase/init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});

React.useEffect(() => {
onAuthStateChanged
}, []);

  function register() {
createUserWithEmailAndPassword(auth, 'email@email.com', 'test123') 
.then((user) => {
  console.log(user)
})
.catch((error) => {
  console.log(error);
})


  }
  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123') 
    .then((user) => {
  setUser(user);
})
.catch((error) => {
  console.log(error.message);
})
  }
function logout() {
   signOut(auth);
   setUser({});
}

  return (
    <div className="App">
      <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
        {user.email}
    </div>
  );
}

export default App;

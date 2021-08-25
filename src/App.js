import './App.css';
import firebase  from './firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { SignIn, auth, firestore } from './Auth';
import { Home } from './Home';
import { Dashboard } from './Dashboard';
import { Navbar } from './Navbar';

import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  const usersRef = firestore.collection("users");

  return (
    <div className="App">
      <Navbar/>
      {user ? <Dashboard usersRef={usersRef}/> : <SignIn/>}
    </div>
  );
}

export default App;

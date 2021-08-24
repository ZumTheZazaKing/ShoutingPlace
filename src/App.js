import './App.css';
import firebase  from './firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { SignIn, auth } from './Auth';
import { Home } from './Home';

import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <Home/> : <SignIn/>}
    </div>
  );
}

export default App;

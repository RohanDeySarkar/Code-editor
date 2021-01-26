import './App.css';

import Login from './components/Login';
import CodeEditor from './components/CodeEditor';

import {useStateValue} from './components/StateProvider';
import { useEffect } from 'react';

import { auth } from './firebase';

function App() {

  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          {
            type: 'SET_USER',
            payload: {
              uid: authUser.uid,
              photo: authUser.photoURL,
              email: authUser.email,
              displayName: authUser.displayName,
            }
          }
        )
      } else {
        dispatch(
          {
            type: 'SET_USER',
            payload: null
          }
        )
      }
    })
  }, [])

  // console.log(user);
  
  return (
    <div className="app">
      {!user? <Login /> : <CodeEditor />}
    </div>
  );
}

export default App;

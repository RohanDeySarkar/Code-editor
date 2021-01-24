import './App.css';

import {Switch, Route} from "react-router-dom"

import Login from './components/Login';
import CodeEditor from './components/CodeEditor';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exaact path="/">
          <CodeEditor />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

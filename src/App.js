import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BlockList from "./components/BlockList/BlockList";
import BlockAdd from "./components/BlockAdd/BlockAdd";

import "./assets/scss/main.scss";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/add">
            <BlockAdd />
          </Route>
          <Route path="/list">
            <BlockList />
          </Route>
          <Route>
            <BlockList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

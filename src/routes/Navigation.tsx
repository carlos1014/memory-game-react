import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { FormPage } from '../pages/formPage/FormPage';
import GamePage from '../pages/gamePage';


export const Navigation = () => {
  return (
    <Router>
      <div className="main-layout">
        <Switch>
          <Route path="/game">
            <GamePage />
          </Route>
          <Route path="/">
            <FormPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
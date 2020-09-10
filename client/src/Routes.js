import React from "react";
import { Route, Switch } from "react-router-dom";
import Results from './components/Results';


export default function Routes(props) {
  console.log(props);
  return (
    <Switch>
      <Route
              path='/'
              render={(props) => (
                <Leaderboard {...props} isAuthed={true} />
              )}
            />
      <Route path="/results" exact component={Results} />
      <Route path="/schedules" exact render={props => <Table test={'tester'} {...props}  />} />
    </Switch>
  );
}
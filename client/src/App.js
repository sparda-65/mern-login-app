import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import { Home, Login, SignUp } from './pages/index.page';
import { NavBar, ProtectedRoute, NotFound } from './components/index.component'

function App() {
  return (
    <div>
      <Container>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="*" component={NotFound} exact />
        </Switch>
      </Container>
    </div>
  );
}

export default App;

import React from 'react';
import {Route} from 'react-router-dom';
import {Container} from 'reactstrap';

import {Home, Login, SingUp} from './pages/index.page';
import {NavBar} from './components/index.component'

function App() {
  return (
    <div>
      <Container>
      <NavBar/>
      <Route path='/' component ={Home} exact/>
      <Route path='/Login' component ={Login} exact/>
      <Route path='/Singup' component ={SingUp} exact/>
      </Container>
    </div>
  );
}

export default App;

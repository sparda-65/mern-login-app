import React from 'react';
import {Route} from 'react-router-dom';
import {Container} from 'reactstrap';

import {Home, Login} from './pages/index.page';
import {NavBar} from './components/index.component'

function App() {
  return (
    <div>
      <Container>
      <NavBar/>
      <Route path='/' component ={Home} exact/>
      <Route path='/Login' component ={Login} exact/>
      </Container>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Jumbotron } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <Jumbotron>
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>;
    </div>
  );
}

export default App;

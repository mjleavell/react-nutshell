import React from 'react';
import { Button } from 'reactstrap';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <button className='btn btn-light'>bootstrap</button>
        <Button
          tag='a'
          color='dark'
          href="http://reactstrap.github.io"
          target="_blank"
        >Click to Docs</Button>
      </div>
    );
  }
}

export default App;

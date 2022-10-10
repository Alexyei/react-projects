import React from 'react';
import './App.css';
import {AppRouter} from "./router/AppRouter";

function App() {
  return (
    <div className="App">
      <div className="container">
        <AppRouter/>
      </div>
    </div>
  );
}

export default App;

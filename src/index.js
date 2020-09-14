import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToDo from './components/ToDo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ToDo />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
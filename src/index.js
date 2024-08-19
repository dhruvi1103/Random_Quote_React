import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import RandomQuoteMachine from './components/RandomQuoteMachine';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RandomQuoteMachine />
  </React.StrictMode>
);
reportWebVitals();

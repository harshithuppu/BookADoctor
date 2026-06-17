import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css';

// Intercept localStorage setItem/removeItem to sync state across current window tabs
const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
  originalSetItem.apply(this, arguments);
  if (key === 'userData') {
    window.dispatchEvent(new Event('storage'));
  }
};

const originalRemoveItem = localStorage.removeItem;
localStorage.removeItem = function (key) {
  originalRemoveItem.apply(this, arguments);
  if (key === 'userData') {
    window.dispatchEvent(new Event('storage'));
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

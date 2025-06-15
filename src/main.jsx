// src/main.jsx (or src/index.js)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router here
import App from './App.jsx';
import './index.css'; // Assuming you have a global CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* <-- Wrap App with Router here */}
      <App />
    </Router>
  </React.StrictMode>,
);
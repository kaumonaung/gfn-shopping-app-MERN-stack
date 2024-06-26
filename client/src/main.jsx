import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Router from './pages/router.jsx';
import { AuthProvider } from './lib/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from 'components/context/userContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter basename='/goit-react-hw-08-phonebook/'>
  <UserProvider>
    <App />
    </UserProvider>
  </BrowserRouter>
   </React.StrictMode>
);

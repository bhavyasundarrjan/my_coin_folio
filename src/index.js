import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CurrencyContext from './utilsContext/CurrencyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <CurrencyContext>
    <App />
    </CurrencyContext>
  
);

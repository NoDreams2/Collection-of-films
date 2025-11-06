import { CssBaseline } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App.jsx';

import './main.scss';

import { store } from './app/store.js';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
);

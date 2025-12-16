import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from '@/shared';

import App from './App';

import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='/Rick-and-Morty'>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);

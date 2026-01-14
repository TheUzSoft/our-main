import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  if (rootElement) {
    rootElement.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Error loading application</h1><p>Please refresh the page.</p></div>';
  }
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

console.log('Initializing React app...');

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('React app initialized successfully');
} catch (error) {
  console.error('Failed to render app:', error);
  if (rootElement) {
    rootElement.innerHTML = '<div style="padding: 20px; text-align: center; font-family: Arial;"><h1>Xatolik yuz berdi</h1><p>Iltimos, sahifani yangilang.</p><button onclick="window.location.reload()" style="padding: 10px 20px; background: #1476FF; color: white; border: none; border-radius: 5px; cursor: pointer;">Yangilash</button></div>';
  }
}

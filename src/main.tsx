import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';
import { initializeAuth } from './services/auth';
import { initializeNotifications } from './services/notifications';

// Initialize Firebase Authentication
initializeAuth();

// Initialize Push Notifications
initializeNotifications();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
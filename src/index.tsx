import React from 'react';
import ReactDOM from 'react-dom/client';
import PolicyHolderPage from './components/PolicyHolderPage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <PolicyHolderPage />
  </React.StrictMode>
);

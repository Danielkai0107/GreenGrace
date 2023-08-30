//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import App from './App';


// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('Service Worker Registered', reg))
    .catch((err) => console.log('Service Worker Not Registered', err));
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <App/>
</React.StrictMode>
);

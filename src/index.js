import React from 'react';
import { createRoot } from 'react-dom/client';
import './global.less';
import App from './app';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

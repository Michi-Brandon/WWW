import React from 'react'
import { createRoot } from 'react-dom/client';

import App from './components/app'

import './stylesheets/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Funcionalidades JS de Bootstrap



document.body.innerHTML = '<div id="root"></div>';
const root = createRoot(document.getElementById('root'));
root.render(<App />);

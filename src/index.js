import React from 'react';
import { createRoot } from 'react-dom/client';


import App from './components/app/App';
import './style/style.scss';
import CocktailService from './services/CocktailService'

const cocktailService = new CocktailService();

cocktailService.getRandomCocktail().then(res => console.log(res));


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

);


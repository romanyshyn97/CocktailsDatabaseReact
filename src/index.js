import React from 'react';
import { createRoot } from 'react-dom/client';


import App from './components/app/App';
import './style/style.scss';
// import useCocktailService from './services/CocktailService'

// const {getIngridientById} = useCocktailService();

// getIngridientById().then(res => console.log(res));

// cocktailService.getRandomCocktail().then(res => console.log(res));
// cocktailService.getAlcoCocktail().then(res => console.log(res));
// cocktailService.getCocktailById(15395).then(res => console.log(res));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

);


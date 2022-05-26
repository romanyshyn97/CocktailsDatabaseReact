import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CocktailService from '../../services/CocktailService';
import './randomChar.scss';

import cocktail from '../../resources/img/headerCocktail.png';

const RandomCocktail = () => {
    const [drink, setDrink] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    const cocktailService = new CocktailService();

    useEffect(() => {
        updateDrink();
    }, [])
    

    const onDrinkLoaded = (drink) => {
        setDrink(drink);
        setLoading(false);
    }
    const onDrinkLoading = () => {
        setLoading(true);
    }
    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const updateDrink = () => {
        onDrinkLoading();
        cocktailService.getRandomCocktail()
            .then(onDrinkLoaded)
            .catch(onError)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <ViewPart drink={drink}/> : null;
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random cocktail for today!<br/>
                    Do you want to know ingridients?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                    className="button button__main"
                    onClick={updateDrink}>
                    <div className="inner">try it</div>
                </button>
                <img src={cocktail} alt="cocktail" className="randomchar__decoration"/>
            </div>
        </div>
    )
    

}
const ViewPart = ({drink}) => {
    const {strDrink, strDrinkThumb, strInstructions, strIngrigients} = drink;
    const view = (strInstructions.length > 210) ? strInstructions.slice(0,210) + '...' : strInstructions;
    return (
            <div className="randomchar__block">
                <img src={strDrinkThumb} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{strDrink}</p>
                    <p className="randomchar__descr">
                       Instruction: 
                       {view}
                    </p>
                    <p className="randomchar__descr">
                        Ingridients: 
                       {strIngrigients}
                    </p>
                    
            </div>
        </div>
    )
}

export default RandomCocktail;
import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useCocktailService from '../../services/CocktailService';
import './randomCocktail.scss';

import cocktail from '../../resources/img/headerCocktail.png';

const RandomCocktail = () => {
    const [drink, setDrink] = useState(null);
    const {loading, error, clearError, getRandomCocktail} =  useCocktailService();

    useEffect(() => {
        updateDrink();
    }, [])
    

    const onDrinkLoaded = (drink) => {
        setDrink(drink);
    }


    const updateDrink = () => {
        clearError();
        getRandomCocktail()
            .then(onDrinkLoaded)
            
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !drink) ? <ViewPart drink={drink}/> : null;
    return (
        <div className="random">
            {errorMessage}
            {spinner}
            {content}
            <div className="random__static">
                <p className="random__title">
                    Random cocktail for today!<br/>
                    Do you want to know ingredients?
                </p>
                <p className="random__title">
                    Or choose another one
                </p>
                <div>
                    <button 
                        className="dws"
                        onClick={updateDrink}>
                        <div className="butt">try it</div>
                    </button>
                </div>
                
                <img src={cocktail} alt="cocktail" className="random__decoration"/>
            </div>
        </div>
    )
    

}
const ViewPart = ({drink}) => {
    const {strDrink, strDrinkThumb, strInstructions, strIngredients} = drink;
    const view = (strInstructions.length > 210) ? strInstructions.slice(0,210) + '...' : strInstructions;
    return (
            <div className="random__block">
                <img src={strDrinkThumb} alt="Random character" className="random__img"/>
                <div className="random__info">
                    <p className="random__name">{strDrink}</p>
                    <p className="random__descr">
                       Instruction: 
                       {view}
                    </p>
                    <p className="random__descr">
                        Ingredients: 
                       {strIngredients}
                    </p>
                    
            </div>
        </div>
    )
}

export default RandomCocktail;
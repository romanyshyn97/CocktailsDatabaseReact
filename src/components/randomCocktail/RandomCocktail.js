import { useState, useEffect, useRef} from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useCocktailService from '../../services/CocktailService';
import { Link } from 'react-router-dom';
import './randomCocktail.scss';

import cocktail from '../../resources/img/headerCocktail.png';

const RandomCocktail = ({onDrinkSelected}) => {
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
    const content = !(loading || error || !drink) ? <ViewPart drink={drink} onDrinkSelected={onDrinkSelected}/> : null;
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



const ViewPart = ({drink, onDrinkSelected}) => {
    const {strDrink, strDrinkThumb, strInstructions, strIngredients, idDrink} = drink;
    // const addClass = (e) => {
    //     e.currentTarget.classList.add('random__img_selected');
    // }
    const itemRefs = useRef([]);
    
    const focusOnItem = () => {
        // itemRefs.current.classList.remove('random__img_selected');
        itemRefs.current.classList.toggle('random__img_selected');
        itemRefs.current.focus();
    }
    return (
            <div className="random__block">
                <img 
                    ref={el => itemRefs.current = el}
                    onClick={() => 
                    {onDrinkSelected(idDrink)
                    focusOnItem()}} src={strDrinkThumb} alt="Random character" className="random__img" />
                <div className="random__info">
                    <p 
                        className="random__name"
                        onClick={() => onDrinkSelected(idDrink)}>{strDrink}
                    </p>
                    <p className="random__descr">
                       <span>Instruction: </span> 
                       {`${strInstructions.slice(0,150)}...`}
                    </p>
                    <p className="random__descr">
                        <span>Ingredients:</span>  
                       {strIngredients}
                    </p>
                    
            </div>
        </div>
    )
}

export default RandomCocktail;
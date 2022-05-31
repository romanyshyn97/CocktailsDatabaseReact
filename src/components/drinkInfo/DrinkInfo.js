import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useCocktailService from '../../services/CocktailService';

import './drinkInfo.scss';


const DrinkInfo = (props) => {
    const [drink, setDrink] = useState(null);
    const {loading, error, getCocktailById, getIngredientById, getAllIngredients} = useCocktailService();

  

    

    useEffect(() => {
        updateDrink();
        getIngredientById().then(res => console.log(res));
        getAllIngredients().then(res => console.log(res));
    },[props.drinkId])
    
    const updateDrink = () => {
        const {drinkId} = props;
        if (!drinkId){
            return;
        }
        getCocktailById(drinkId)
            .then(onDrinkLoaded)
            
    }
    const onDrinkLoaded = (drink) => {
        setDrink(drink);
       
    }
   

    const skeleton = drink || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !drink) ? <ViewPart drink={drink}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
    
    
}

const ViewPart = ({drink}) => {
    const {strDrink, strDrinkThumb, strInstructions, strIngridients, strMeasure} = drink;
    const ingridients = strIngridients.split(", ");
    const measures = strMeasure.split(", ");
    
    return(
        <>
            <div className="char__basics">
                <img src={strDrinkThumb} alt="abyss"/>
                <div className="char__info-name">{strDrink}</div>
            </div>
            <div className="char__descr">
                {strInstructions}
            </div>
             <div className="char__comics">                 
                Ingridients: 
             </div>
                <ul className="char__comics-list">
                    {
                        ingridients.map((item, i) => {
                        return(
                            <li key={i} className="char__comics-item">
                                {item} {':'}
                                {' '}
                                {measures[i]}
                                <img src={`https://www.thecocktaildb.com/images/ingredients/${item}-Small.png`} alt={item}/> 
                            </li>
                        )
                    })
                    }
                    
                   
                </ul>
        </>
    )
}


export default DrinkInfo;
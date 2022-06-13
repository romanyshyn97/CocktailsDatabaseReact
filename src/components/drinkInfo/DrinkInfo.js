import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useCocktailService from '../../services/CocktailService';
import { NavLink } from 'react-router-dom';

import './drinkInfo.scss';


const DrinkInfo = (props) => {
    const [drink, setDrink] = useState(null);
    const {loading, error, getCocktailById} = useCocktailService();

  

    

    useEffect(() => {
        updateDrink();
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
        <div className="drink__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
    
    
}

const ViewPart = ({drink}) => {
    const {strDrink, strDrinkThumb, strInstructions, strIngredients, strMeasure} = drink;
    const ingredients = strIngredients.split(", ");
    const measures = strMeasure.split(", ");
    
    return(
        <>
            <div className="drink__basics">
                <img src={strDrinkThumb} alt={strDrink}/>
                <div className="drink__info-name">{strDrink}</div>
            </div>
            <div className="drink__descr">
                {strInstructions}
            </div>
             <div className="drink__ingredient">                 
                Ingredients: 
             </div>
                <ul className="drink__ingredient-list">
                    {
                        ingredients.map((item, i) => {
                        return(
                            <NavLink to={`/ingredients/${item}`} key={i} className="drink__ingredient-item">
                                {item} {':'}
                                {' '}
                                {measures[i]}
                                <img src={`https://www.thecocktaildb.com/images/ingredients/${item}-Small.png`} alt={item}/> 
                            </NavLink>
                        )
                    })
                    }
                    
                   
                </ul>
        </>
    )
}


export default DrinkInfo;
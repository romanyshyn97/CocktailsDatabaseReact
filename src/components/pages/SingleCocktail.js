import { useState } from "react";


import AppBanner from "../appBanner/AppBanner";
import ListByIngredient from "../drinksByIngredient/ListByIngredient";
import DrinkInfo from "../drinkInfo/DrinkInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/decoration.png';

const SingleCocktail = (props) => {
    const [selectedDrink, setDrink] = useState(null);
    
    

    const onDrinkSelected = (id) => {
        setDrink(id);
    }
    return(
        <>
            <ErrorBoundary>
                <AppBanner/>
            </ErrorBoundary>
            <div className="drink__content">
                <ErrorBoundary>
                    <ListByIngredient onDrinkSelected={onDrinkSelected} onIngrSelected={props.onIngrSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <DrinkInfo drinkId={selectedDrink}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default SingleCocktail;
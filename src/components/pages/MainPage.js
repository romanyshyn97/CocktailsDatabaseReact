import { useState } from "react";

import RandomCocktail from "../randomCocktail/RandomCocktail";
import DrinkList from "../drinkList/DrinkList";
import DrinkInfo from "../drinkInfo/DrinkInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/decoration.png';

const MainPage = () => {
    const [selectedDrink, setDrink] = useState(null);
    

    const onDrinkSelected = (id) => {
        setDrink(id);
    }
    return(
        <>
            <ErrorBoundary>
                <RandomCocktail/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <DrinkList onDrinkSelected={onDrinkSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <DrinkInfo drinkId={selectedDrink}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;
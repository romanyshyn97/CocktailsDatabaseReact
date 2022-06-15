import { useState } from "react";

import RandomCocktail from "../randomCocktail/RandomCocktail";
import DrinkList from "../drinkList/DrinkList";
import DrinkInfo from "../drinkInfo/DrinkInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FilterButtons from "../filterButtons/FilterButtons";
import '../../style/style.scss'

import decoration from '../../resources/img/decoration.png';

const MainPage = () => {
    const [selectedDrink, setDrink] = useState(null);
    const [filter, setFilter] = useState('');

    const onFilterSelect = (filter) => {
        setFilter(filter);
    }

    const onDrinkSelected = (id) => {
        setDrink(id);
    }
    return(
        <>
            <ErrorBoundary>
                <RandomCocktail onDrinkSelected={onDrinkSelected}/>
            </ErrorBoundary>
            <FilterButtons filter={filter} onFilterSelect={onFilterSelect}/>
            <div className="list__content">
                <ErrorBoundary>
                    <DrinkList onDrinkSelected={onDrinkSelected} filter={filter}/>
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
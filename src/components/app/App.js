import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomCocktail from "../randomCocktail/RandomCocktail";
import DrinkList from "../drinkList/DrinkList";
import DrinkInfo from "../drinkInfo/DrinkInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";



import decoration from '../../resources/img/decoration.png';



const App = () => {
    const [selectedDrink, setDrink] = useState(null);
    

    const onDrinkSelected = (id) => {
        setDrink(id);
    }
   
        return (
            <div className="app">
                <AppHeader/>
                <main>
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
                </main>
            </div>
        )
    }
    


export default App;
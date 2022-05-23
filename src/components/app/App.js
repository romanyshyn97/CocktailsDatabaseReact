import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomCocktail from "../randomCocktail/RandomCocktail";
import DrinkList from "../drinkList/DrinkList";
import DrinkInfo from "../drinkInfo/DrinkInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";



import decoration from '../../resources/img/decoration.png';



class App extends Component {
    state = {
        selectedDrink: null
    }

    onDrinkSelected = (id) => {
        this.setState({
            selectedDrink: id
        })
    }
    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomCocktail/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <DrinkList onDrinkSelected={this.onDrinkSelected}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <DrinkInfo drinkId={this.state.selectedDrink}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
    
}

export default App;
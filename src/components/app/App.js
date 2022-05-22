import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomCocktail/RandomCocktail";
import DrinkList from "../drinkList/DrinkList";
import DrinkInfo from "../drinkInfo/DrinkInfo";


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
                    <RandomChar/>
                    <div className="char__content">
                        <DrinkList onDrinkSelected={this.onDrinkSelected}/>
                        <DrinkInfo drinkId={this.state.selectedDrink}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
    
}

export default App;
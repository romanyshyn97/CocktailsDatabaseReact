import { Component } from 'react';
import CocktailService from '../../services/CocktailService';
import './randomChar.scss';

import cocktail from '../../resources/img/headerCocktail.png';

class RandomChar extends Component{
    constructor(props) {
        super(props);
        this.updateCocktail();
    }
    state = {
        strDrink: null,
        strInstructions: null,
        strDrinkThumb: null,
        strIngrigients: null
    }
    cocktailService = new CocktailService();

    // componentDidMount(){
    //     this.updateCocktail();
    // }

    updateCocktail = () => {
        this.cocktailService
            .getRandomCocktail()
            .then(res => {
                this.setState(res)
            })
    }


    render(){
        const {strDrink, strInstructions, strDrinkThumb, strIngrigients} = this.state;
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={strDrinkThumb} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{strDrink}</p>
                        <p className="randomchar__descr">
                           Instruction: 
                           {strInstructions}
                        </p>
                        <p className="randomchar__descr">
                            Ingridients: 
                           {strIngrigients}
                        </p>
                        
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random cocktail for today!<br/>
                        Do you want to know ingridients?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={cocktail} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;
import { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CocktailService from '../../services/CocktailService';
import './randomChar.scss';

import cocktail from '../../resources/img/headerCocktail.png';

class RandomChar extends Component{
    
    state = {
        drink: {},
        loading: true,
        error: false
    }
    cocktailService = new CocktailService();

    componentDidMount(){
        this.updateDrink();
    }

    onDrinkLoaded = (drink) => {
        this.setState({
            drink,
            loading: false
        })
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateDrink = () => {
        this.cocktailService
            .getRandomCocktail()
            .then(this.onDrinkLoaded)
            .catch(this.onError)
    }

    
    render(){
        const {drink, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <ViewPart drink={drink}/> : null;
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random cocktail for today!<br/>
                        Do you want to know ingridients?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button 
                        className="button button__main"
                        onClick={this.updateDrink}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={cocktail} alt="cocktail" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }

}
const ViewPart = ({drink}) => {
    const {strDrink, strDrinkThumb, strInstructions, strIngrigients} = drink;
    const view = (strInstructions.length > 210) ? strInstructions.slice(0,210) + '...' : strInstructions;
    return (
            <div className="randomchar__block">
                <img src={strDrinkThumb} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{strDrink}</p>
                    <p className="randomchar__descr">
                       Instruction: 
                       {view}
                    </p>
                    <p className="randomchar__descr">
                        Ingridients: 
                       {strIngrigients}
                    </p>
                    
            </div>
        </div>
    )
}

export default RandomChar;
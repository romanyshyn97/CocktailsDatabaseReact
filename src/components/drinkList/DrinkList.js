import { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CocktailService from '../../services/CocktailService';

import './drinkList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component{
    state = {
        drinkList: [],
        loading:true,
        error: false

    }

    cocktailService = new CocktailService();

    componentDidMount(){
        this.cocktailService.getAlcoCocktail()
            .then(this.onDrinkListLoaded)
            .catch(this.onError)
    }

    onDrinkListLoaded = (drinkList) => {
        this.setState({
            drinkList,
            loading: false
        })
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderItems(arr){
        const items = arr.map((item) => {
            return(
                <li 
                    className="char__item"
                    key={item.id}>
                    <img src={item.strDrinkThumb} alt={item.strDrink}/>
                    <div className="char__name">{item.strDrink}</div>
                </li>
            )
        })
        return(
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render(){
        const {drinkList, loading, error} = this.state;
        const items = this.renderItems(drinkList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items: null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;
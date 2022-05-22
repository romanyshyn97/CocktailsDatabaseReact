import { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CocktailService from '../../services/CocktailService';

import './drinkList.scss';


class DrinkList extends Component{
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
    itemRefs = [];
    setRef = (ref) => {
        this.itemRefs.push(ref);
    }
    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }
    renderItems(arr){
        const items = arr.map((item, i) => {
            return(
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={this.setRef}
                    key={item.idDrink}
                    onClick={() => {
                        this.props.onDrinkSelected(item.idDrink);
                        this.focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter"){
                            this.props.onDrinkSelected(item.idDrink);
                            this.focusOnItem(i);
                        }
                    }}>
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

export default DrinkList;
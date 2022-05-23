import { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CocktailService from '../../services/CocktailService';

import './drinkList.scss';


class DrinkList extends Component{
    state = {
        drinkList: [],
        loading:true,
        error: false,
        newItemLoading: false,
        offset: 0


    }

    cocktailService = new CocktailService();

    componentDidMount(){
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onDrinkListLoading();
        this.cocktailService.getAlcoCocktail(offset)
            .then(this.onDrinkListLoaded)
            .catch(this.onError)
    }

    onDrinkListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onDrinkListLoaded = (newDrinkList) => {
        this.setState(({drinkList, offset}) => ({
            drinkList: [...drinkList, ...newDrinkList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9

        }))
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
        });
        return(
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render(){
        const {drinkList, loading, error, newItemLoading, offset} = this.state;
        const items = this.renderItems(drinkList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items: null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default DrinkList;
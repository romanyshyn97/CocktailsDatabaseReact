import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useCocktailService from '../../services/CocktailService';

import './drinkList.scss';


const DrinkList = (props) => {
    const [drinkList, setDrinkList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(9);
    const [endDrink, setEndDrink] = useState(false);
    
    const {loading, error, getAlcoCocktail} = useCocktailService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) :  setNewItemLoading(true);
        getAlcoCocktail(offset)
            .then(onDrinkListLoaded)
            
    }

    

    const onDrinkListLoaded = (newDrinkList) => {
        let ended = false;
        if (newDrinkList.length > 90){
            ended = true;
        }
        setDrinkList(newDrinkList);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setEndDrink(ended)
    }
   

    const itemRefs = useRef([]);
    
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
    function renderItems(arr){
        const items = arr.map((item, i) => {
            return(
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.idDrink}
                    onClick={() => {
                        props.onDrinkSelected(item.idDrink);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter"){
                            props.onDrinkSelected(item.idDrink);
                            focusOnItem(i);
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

    const items = renderItems(drinkList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display' : endDrink ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
    


export default DrinkList;
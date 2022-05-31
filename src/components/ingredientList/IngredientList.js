import { useState, useEffect } from "react";
import useCocktailService from "../../services/CocktailService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './ingredientList.scss';

const IngredientList = () => {
    const [ingrList, setIngrList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    
    const {loading, error, getAllIngredients} = useCocktailService();

    useEffect(() => {
        onRequest(true);
    }, [])

    const onRequest = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllIngredients()
            .then(onIngrLoaded)
    }
    
    const onIngrLoaded = (newIngrList) => {
        setIngrList(newIngrList);
        setNewItemLoading(false);

    }

    function renderItems(arr){
        const items = arr.map((item, i) => {
            return(
                <li className="ingredients__item" key={i}>
                    <a href="#">
                        <img src={`https://www.thecocktaildb.com/images/ingredients/${item.strIngredient}-Medium.png`} alt={item.strIngredient} className="ingredients__item-img"/>
                        <div className="ingredients__item-name">{item.strIngredient}</div>
                        
                    </a>
                </li>
            )
        })
        return (
            <ul className="ingredients__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(ingrList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                // disabled={newItemLoading} 
                // style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest()}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default IngredientList;
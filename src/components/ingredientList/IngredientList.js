import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCocktailService from "../../services/CocktailService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './ingredientList.scss';
import '../../style/button.scss';

const IngredientList = () => {
    const [ingrList, setIngrList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(8);
    const [listEnd, setListEnd] = useState(false);
    
    const {loading, error, getAllIngredients} = useCocktailService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllIngredients(offset)
            .then(onIngrLoaded)
    }
    
    const onIngrLoaded = (newIngrList) => {
        let ended = false;
        if(newIngrList.length > 99){
            ended = true;
        }
        setIngrList(newIngrList);
        setNewItemLoading(false);
        setOffset(offset + 8);
        setListEnd(ended);

    }

    function renderItems(arr){
        const items = arr.map((item, i) => {
            return(
                <li className="ingredients__item" key={i}>
                    <Link to={`/ingredients/${item.strIngredient}`}>
                        <img src={`https://www.thecocktaildb.com/images/ingredients/${item.strIngredient}-Medium.png`} alt={item.strIngredient} className="ingredients__item-img"/>
                        <div className="ingredients__item-name">{item.strIngredient}</div>
                        
                    </Link>
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
                disabled={newItemLoading} 
                style={{'display' : listEnd ? 'none' : 'block'}}
                className="butt button-load"
                onClick={() => onRequest(offset)}>
                load more
            </button>
        </div>
    )
}

export default IngredientList;
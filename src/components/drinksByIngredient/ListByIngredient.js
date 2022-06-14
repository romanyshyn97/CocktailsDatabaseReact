import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCocktailService from '../../services/CocktailService';
import Spinner from '../spinner/spinner';
import Drinks from "./DrinksByIngredient";
import Pagination from "./Pagination";
import './byIngredient.scss';

const ListByIngredient = (props) => {
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [drinksPerPage] = useState(6);
    const {name} = useParams();

    const {getCocktailByIngredient} = useCocktailService();

    useEffect(() => {
        onRequest();
      }, [name]);

    const onRequest = () => {
        if(loading){
            return <Spinner/>
        }
        getCocktailByIngredient(name)
            .then(onDrinkListLoaded)
    }

    const onDrinkListLoaded = (drinkList) => {
        setDrinks(drinkList);
        setLoading(false)
    }

    const indexOfLastPost = currentPage * drinksPerPage;
    const indexOfFirstPost = indexOfLastPost - drinksPerPage;
    const currentDrinks = drinks.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    return(
        <div>
            <h1>Choose drink with {name}</h1>
            <Drinks drinks={currentDrinks} loading={loading} onDrinkSelected={props.onDrinkSelected}  />
            <Pagination 
            drinksPerPage={drinksPerPage} 
            totalDrinks={drinks.length}
            paginate={paginate} />
        </div>
    )
}

export default ListByIngredient;
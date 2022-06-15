import React, { useState, useEffect } from "react";
import useCocktailService from '../../services/CocktailService';
import Spinner from '../spinner/spinner';
import Drinks from "./Drinks";
import Pagination from "./Pagination";
import './drinkList.scss';

const DrinkList = (props) => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [drinksPerPage] = useState(6);

  const {getAlcoCocktail} = useCocktailService();
  
  useEffect(() => {
    onRequest();
  }, [props.filter]);
  const onRequest = () => {
        if(loading) {
            return <Spinner/>
        }
        getAlcoCocktail(props.filter)
            .then(onDrinkListLoaded)
        }

  const onDrinkListLoaded = (newDrinkList) => {
            setDrinks(newDrinkList);
            setLoading(false)
        }
  

  //Get current drinks
  const indexOfLastPost = currentPage * drinksPerPage;
  const indexOfFirstPost = indexOfLastPost - drinksPerPage;
  const currentDrinks = drinks.slice(indexOfFirstPost, indexOfLastPost)

  //Change page
  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="container">
      <Drinks drinks={currentDrinks} loading={loading} onDrinkSelected={props.onDrinkSelected}/>
      <Pagination 
        drinksPerPage={drinksPerPage} 
        totalDrinks={drinks.length}
        paginate={paginate} />
    </div>
  );
}

export default DrinkList;
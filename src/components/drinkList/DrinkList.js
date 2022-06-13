// import { useState, useEffect, useRef } from 'react';
// import Spinner from '../spinner/spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import useCocktailService from '../../services/CocktailService';

// import './drinkList.scss';


// const DrinkList = (props) => {
//     const [drinkList, setDrinkList] = useState([]);
//     const [newItemLoading, setNewItemLoading] = useState(false);
//     const [offset, setOffset] = useState(9);
//     const [endDrink, setEndDrink] = useState(false);
    
//     const {loading, error, getAlcoCocktail} = useCocktailService();

//     useEffect(() => {
//         onRequest(offset, true);
//     }, [])

//     const onRequest = (offset, initial) => {
//         initial ? setNewItemLoading(false) :  setNewItemLoading(true);
//         getAlcoCocktail(offset)
//             .then(onDrinkListLoaded)
            
//     }

    

//     const onDrinkListLoaded = (newDrinkList) => {
//         let ended = false;
//         if (newDrinkList.length > 90){
//             ended = true;
//         }
//         setDrinkList(newDrinkList);
//         setNewItemLoading(false);
//         setOffset(offset => offset + 9);
//         setEndDrink(ended)
//     }
   

//     const itemRefs = useRef([]);
    
//     const focusOnItem = (id) => {
//         itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
//         itemRefs.current[id].classList.add('char__item_selected');
//         itemRefs.current[id].focus();
//     }
//     function renderItems(arr){
//         const items = arr.map((item, i) => {
//             return(
//                 <li 
//                     className="char__item"
//                     tabIndex={0}
//                     ref={el => itemRefs.current[i] = el}
//                     key={item.idDrink}
//                     onClick={() => {
//                         props.onDrinkSelected(item.idDrink);
//                         focusOnItem(i);
//                     }}
//                     onKeyPress={(e) => {
//                         if (e.key === ' ' || e.key === "Enter"){
//                             props.onDrinkSelected(item.idDrink);
//                             focusOnItem(i);
//                         }
//                     }}>
//                     <img src={item.strDrinkThumb} alt={item.strDrink}/>
//                     <div className="char__name">{item.strDrink}</div>
//                 </li>
//             )
//         });
//         return(
//             <ul className="char__grid">
//                 {items}
//             </ul>
//         )
//     }

//     const items = renderItems(drinkList);

//     const errorMessage = error ? <ErrorMessage/> : null;
//     const spinner = loading && !newItemLoading ? <Spinner/> : null;
    
//     return (
//         <div className="char__list">
//             {errorMessage}
//             {spinner}
//             {items}
//             <button 
//                 className="button button__main button__long"
//                 disabled={newItemLoading}
//                 style={{'display' : endDrink ? 'none' : 'block'}}
//                 onClick={() => onRequest(offset)}>
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }
    


// export default DrinkList;


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
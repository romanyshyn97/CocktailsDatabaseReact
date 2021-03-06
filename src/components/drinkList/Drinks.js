import React, { useRef } from "react";
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './drinkList.scss';

const Drinks = ({drinks, loading, onDrinkSelected}) => {
   
    const itemRefs = useRef([]);
    
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('list__item_selected'));
        itemRefs.current[id].classList.add('list__item_selected');
        itemRefs.current[id].focus();
    }

    // const focusOnItem= (item) => {
    //     item.current.classList.add('drink__item_selected')
    // }
    
    

    return (
        
        <ul className="list__grid">
        {drinks.map((item, i) => (
            <li 
                    className='list__item'
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.idDrink}
                    onClick={() => {
                        onDrinkSelected(item.idDrink);
                        focusOnItem(i);
                        
                    }}
                    >
                    <img src={item.strDrinkThumb} alt={item.strDrink}/>
                    <div className="list__name">{item.strDrink}</div>
                </li>
        ))}
        </ul>
    );
}

export default Drinks;
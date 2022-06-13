import React from "react";
import { NavLink } from "react-router-dom";

const Pagination = ({ drinksPerPage, totalDrinks, paginate }) => {
    const pageNumbers = [];
    

    for (let i=1; i <= Math.ceil(totalDrinks/ drinksPerPage); i++){
        pageNumbers.push(i);
    }
    
    return(
        <nav>
            <ul className="pagination" style={{'marginTop': '20px', 'marginLeft':'15px'}}>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item '>
                        <NavLink to="##" onClick={(e) => {e.preventDefault();
                        paginate(number)}} className="page-link ">
                            {number}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;
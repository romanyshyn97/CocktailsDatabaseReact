import React from "react";

const Pagination = ({ drinksPerPage, totalDrinks, paginate }) => {
    const pageNumbers = [];

    for (let i=1; i <= Math.ceil(totalDrinks/ drinksPerPage); i++){
        pageNumbers.push(i);
    }
    
    return(
        <nav>
            <ul className="pagination" style={{'margin-top': '20px', 'margin-left':'15px'}}>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item '>
                        <a href="##" onClick={() => paginate(number)} className="page-link ">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;
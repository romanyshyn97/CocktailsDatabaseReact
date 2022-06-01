import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useCocktailService from '../../services/CocktailService';
import './singleIngredient.scss';


const SingleIngredientPage = () => {
    const {name} = useParams();
    const [ingr, setIngr] = useState(null);
    const {loading, error, getIngredientByName, clearError} = useCocktailService(); 

    useEffect(() => {
        updateIngr();
    },[name]);

    const updateIngr = () => {
       clearError();
       getIngredientByName(name)
            .then(onIngrLoaded);
    }
    const onIngrLoaded = (ingr) => {
        setIngr(ingr);
    }
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !ingr) ? <ViewPart ingr={ingr}/> : null;
    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
            
    )
}

const ViewPart = ({ingr}) => {
    const {strAlcohol, strIngredient, strType, strDescription} = ingr;
    
    return(
        <div className="single-ingr">
            <img src={`https://www.thecocktaildb.com/images/ingredients/${strIngredient}-Medium.png`} alt={strIngredient} className="single-ingr__img"/>
            <div className="single-ingr__info">
                <h2 className="single-ingr__name">{strIngredient}</h2>
                <p className="single-ingr__descr">{strDescription}</p>
                <p className="single-ingr__descr">Type of drink: {strType}</p>
                <p className="single-ingr__descr">Alcoholic: {strAlcohol}</p>
                
            </div>
            <Link to="/ingredients" className="single-ingr__back">Back to all</Link>
        </div>
    )
}


export default SingleIngredientPage;
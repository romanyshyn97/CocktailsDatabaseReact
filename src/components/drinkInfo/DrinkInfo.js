import { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import CocktailService from '../../services/CocktailService';

import './drinkInfo.scss';


class DrinkInfo extends Component{
    state = {
        drink: null,
        loading: false,
        error: false
    }
    cocktailService = new CocktailService();

    componentDidMount(){
        this.updateDrink();
    }
    componentDidUpdate(prevProps){
        if(this.props.drinkId !== prevProps.drinkId){
            this.updateDrink();
        }
    }
    updateDrink = () => {
        const {drinkId} = this.props;
        if (!drinkId){
            return;
        }
        this.onDrinkLoading();
        this.cocktailService
            .getCocktailById(drinkId)
            .then(this.onDrinkLoaded)
            .catch(this.onError)
    }

    onDrinkLoaded = (drink) => {
        this.setState({
            drink,
            loading: false
        })
    }
    onDrinkLoading = () => {
        this.setState({
            loading: true
        })
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    

    render(){
        const {drink, loading, error} = this.state;

        const skeleton = drink || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !drink) ? <ViewPart drink={drink}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
    
}

const ViewPart = ({drink}) => {
    const {strDrink, strDrinkThumb, strInstructions, strIngrigients, strMeasure} = drink;
    const ingridients = strIngrigients.split(", ");
    const measures = strMeasure.split(", ");
    
    return(
        <>
            <div className="char__basics">
                <img src={strDrinkThumb} alt="abyss"/>
                <div className="char__info-name">{strDrink}</div>
            </div>
            <div className="char__descr">
                {strInstructions}
            </div>
             <div className="char__comics">                 
                Ingridients: 
             </div>
                <ul className="char__comics-list">
                    {
                        ingridients.map((item, i) => {
                        return(
                            <li key={i} className="char__comics-item">
                                {item}
                                {measures[i]}
                            
                            </li>
                        )
                    })
                    }
                    
                   
                </ul>
        </>
    )
}


export default DrinkInfo;
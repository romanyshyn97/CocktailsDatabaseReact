import { useHttp } from '../hooks/http.hook';

const useCocktailService = () => {
    const {loading, error, clearError, request} = useHttp();
    

    const getRandomCocktail = async () => {
       const res = await request('https://www.thecocktaildb.com/api/json/v1/1/random.php');
       return _transformData(res.drinks[0]);
       
    }
    const getCocktailById = async (id) => {
        const res = await request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        return _transformData(res.drinks[0]);
        
     }
    const getAlcoCocktail = async (offset = 9) => {
        const res = await request('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
        const res2 = res.drinks.map(_transformData);
        return res2.slice(0, offset);
        
      
    }
    // getIngrImg = async (ingr) => {
    //     return await this.getResource(`https://www.thecocktaildb.com/images/ingredients/${ingr}-Small.png`)
    // }

    const _transformData = (drink) => {
        const ingridients = [];
        const measure = [];
        
        for (let i = 1; i <= 15; i++) {
            if (!drink['strIngredient'+i]) {
                break;
            }
            ingridients.push(drink['strIngredient'+i])
        }
        for (let j = 1; j <= 15; j++) {
            if (!drink['strMeasure'+j]) {
                break;
            }
            measure.push(drink['strMeasure'+j])
        }
        return{
            idDrink: drink.idDrink,
            strDrink: drink.strDrink,
            strInstructions: drink.strInstructions,
            strDrinkThumb: drink.strDrinkThumb,
            strIngrigients: ingridients.join(', '),
            strMeasure: measure.join(', ')
        }
    }
        
    return {loading, error, clearError, getAlcoCocktail, getCocktailById, getRandomCocktail}
}

export default useCocktailService;
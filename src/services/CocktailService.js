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
    const getAllIngredients = async () => {
        const res = await request(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
        const res2 = res.drinks.map(_transformIngredients);
        return res2.slice(0, 12)
    }
    const getIngredientById = async(id = 1) => {
        const res = await request(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`);
        return _transformIngredient(res.ingredients[0]);
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
            strIngridients: ingridients.join(', '),
            strMeasure: measure.join(', ')
        }
    }
    const _transformIngredient = (ingr) => {
        return{
            idIngredient: ingr.idIngredient,
            strAlcohol: ingr.strAlcohol,
            strIngredient: ingr.strIngredient,
            strType: ingr.strType

        }
    }
    const _transformIngredients = (ingr) => {
        return{
            strIngredient: ingr.strIngredient1

        }
    }
        
    return {loading, error, clearError, getAlcoCocktail, getCocktailById, getRandomCocktail, getAllIngredients, getIngredientById}
}

export default useCocktailService;
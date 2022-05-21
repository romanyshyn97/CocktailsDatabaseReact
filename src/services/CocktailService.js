class CocktailService {
    getResource = async (url) => {
        let res = await fetch(url);
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getRandomCocktail = async () => {
       const res = await this.getResource('https://www.thecocktaildb.com/api/json/v1/1/random.php');
       return this._transformData(res.drinks[0]);
       
    }
    getAlcoCocktail = async () => {
        const res = await this.getResource('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
        const res2 = res.drinks.map(this._transformData);
       return res2.slice(0,9);
    }

    _transformData = (drink) => {
        const ingridients = [];
        
        for (let i = 1; i <= 15; i++) {
            if (!drink['strIngredient'+i]) {
                break;
            }
            ingridients.push(drink['strIngredient'+i])
        }
        return{
            id: drink.idDrink,
            strDrink: drink.strDrink,
            strInstructions: drink.strInstructions,
            strDrinkThumb: drink.strDrinkThumb,
            strIngrigients: ingridients.join(', ')
        }
    }
        
    
}

export default CocktailService;
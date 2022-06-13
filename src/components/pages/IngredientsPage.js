import { useState } from "react";
import IngredientList from "../ingredientList/IngredientList";
import AppBanner from "../appBanner/AppBanner";
import '../../style/style.scss';


const IngredientsPage = () => {
    const [selectedIngr, setIngr] = useState(null);
    

    const onIngrSelected = (name) => {
        setIngr(name);
    }
    return(
        <>
            <AppBanner/>
            <IngredientList onIngrSelected={onIngrSelected} selectedIngr={selectedIngr}/>
           
        </>
    )
}

export default IngredientsPage;
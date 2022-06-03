
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";

import {MainPage, IngredientsPage, Page404, SingleIngredientPage} from '../pages';
import AppHeader from "../appHeader/AppHeader";


const App = () => {
   
   
        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/ingredients" element={<IngredientsPage/>}/>
                            <Route path="/ingredients/:name" element={<SingleIngredientPage/>}/>
                            <Route path='*' element={<Page404/>}/>

                        </Routes>
                    </main>
                </div>
            </Router>
        )
    }
    


export default App;
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomCocktail/RandomCocktail";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";


import decoration from '../../resources/img/decoration.png';



const App = () => {
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList/>
                    <CharInfo/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;
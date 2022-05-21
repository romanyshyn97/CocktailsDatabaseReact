import './charInfo.scss';
import mohito from '../../resources/img/mohito.jpg';

const CharInfo = () => {
    return (
        <div className="char__info">
            <div className="char__basics">
                <img src={mohito} alt="abyss"/>
                <div>
                    <div className="char__info-name">mohito</div>
                    <div className="char__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
            Instructions
  
  Muddle mint leaves with sugar and lime juice.
  Add a splash of soda water and fill the glass with cracked ice.
  Pour the rum and top with soda water.
  Garnish and serve with straw.
            </div>
            <div className="char__comics">Ingredients:</div>
            <ul className="char__comics-list">
                <li className="char__comics-item">
                Soda water

                </li>
                <li className="char__comics-item">
                   2-4 Mint
                </li>
                <li className="char__comics-item">
                    2tsp sugar
                </li>
                <li className="char__comics-item">
                    Juice of 1 lime
                </li>
                <li className="char__comics-item">
                    2-3 oz loght rum
                </li>
               
            </ul>
        </div>
    )
}

export default CharInfo;
import './appBanner.scss';
import cocktails from '../../resources/img/cocktails.png';
import cocktailLogo from '../../resources/img/cocktail-logo.png';

const AppBanner = () => {
    return (
        <div className="app__banner">
            <img src={cocktails} alt="Avengers"/>
            <div className="app__banner-text">
                <span>Choose your </span><br/>
                FAVORITE INGREDIENT
            </div>
            <img src={cocktailLogo} alt="Avengers logo"/>
        </div>
    )
}

export default AppBanner;
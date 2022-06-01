import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';


const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Cocktails</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                        end 
                        style={({isActive}) => ({color: isActive ? '#269ebb' : 'inherit'})} to="/">Cocktails</NavLink></li>
                    /
                    <li><NavLink  
                        style={({isActive}) => ({color: isActive ? '#269ebb' : 'inherit'})}  to="/ingredients">Ingredients</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;
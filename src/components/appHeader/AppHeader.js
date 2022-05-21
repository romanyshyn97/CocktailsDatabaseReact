import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Cocktails</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="#">Cocktails</a></li>
                    /
                    <li><a href="#">Ingredients</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;
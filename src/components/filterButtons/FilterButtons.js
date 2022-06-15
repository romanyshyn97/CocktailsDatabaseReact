import './filterButtons.scss';

const FilterButtons = (props) => {
    const btnsData = [
        {name: 'Alcoholic', label: 'Alco'},
        {name: 'Non_Alcoholic', label: 'Non alco'},
    ];
    const buttons = btnsData.map(({name,label}) => {
        const active = props.filter === name;
        const clazz = active ? 'butt-active' : 'butt-non';
        return (
            <button 
                className={`butt ${clazz} `}
                type="button"
                key={name}
                onClick={() => props.onFilterSelect(name)}>
                    {label}
            </button>
           
        )
    })

    return (
        <div className=" search-panel ">
            {buttons}
            {/* <button 
                className="btn btn-light"
                type="button">
                    All employees
            </button>
            <button 
                className="btn btn-outline-light"
                type="button">
                    For promotion
            </button>
            <button 
                className="btn btn-outline-light"
                type="button">
                    Salary more than 1000$
            </button> */}
        </div>
    );
}

export default FilterButtons;
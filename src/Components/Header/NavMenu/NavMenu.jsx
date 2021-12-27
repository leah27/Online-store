import React from 'react'
import style from './NavMenu.module.css'
import { NavLink } from 'react-router-dom'

class NavMenu extends React.Component {
    render() {
        const { categories, setActiveCategory, activeCategoryIndex } = this.props
        return (
            <ul className={style.nav}>
                {categories.map((category, index) => <li key={index}
                    onClick={() => setActiveCategory(index)}>
                    <NavLink to={'/ProductList'}
                        className={style.navItem}
                        id={activeCategoryIndex === index ? style.active : ""}
                    >
                        {category}
                    </NavLink>
                </li>)}
            </ul>
        )
    }
}

export default NavMenu
import React from 'react'
import style from './NavMenu.module.css'
import { NavLink } from 'react-router-dom'

class NavMenu extends React.Component {
    // state = { path: '/Women' }
    // onLocationChange = () => {
    //     this.setState({ path: window.location.pathname })
    // }
    render() {
        // const menuItems = [
        //     { id: 0, title: 'Women', redirectUrl: '/Women' },
        //     { id: 1, title: 'Men', redirectUrl: '/Men' },
        //     { id: 2, title: 'Kids', redirectUrl: '/Kids' },
        // ]
        return (
            <ul className={style.nav}>
                {this.props.categories.map((category, index) => <li key={index}
                    onClick={() => this.props.setActiveCategory(index)}>
                    <NavLink to={'/ProductList'}
                        className={style.navItem}
                        id={this.props.activeCategoryIndex === index ? style.active : ""}
                    >
                        {category}
                    </NavLink>
                </li>)}
            </ul>
        )
    }
}

export default NavMenu
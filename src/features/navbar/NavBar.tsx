import { Menu } from "./menu/Menu";

import styleNavBar from './NavBar.module.scss'
import { SearchBar } from "./searchBar/SearchBar";

export const NavBar =()=>{
    return (
    <>
    <Menu/>
        <div className={styleNavBar.interactContainer}>
        <SearchBar/>
        <div>sdsdds</div>
        </div>
        </>
    )
}
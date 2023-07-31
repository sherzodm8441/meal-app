import { Link } from "react-router-dom";


function NavBar(){
    return (
        <div className="navbar">
            <h3>MealIt</h3>
            <div className="menu">
                <ul>
                    <li><Link className="navLink">Favorites</Link></li>
                    <li><Link className="navLink">Searches</Link></li>
                    <li><Link className="navLink">Account</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar;
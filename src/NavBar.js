import { Link, useNavigate } from "react-router-dom";


function NavBar(){
    const navigate = useNavigate();

    function logOut(){
        if(localStorage.getItem('user')){
            localStorage.removeItem('user');
        }
        navigate("/");
        window.location.reload();
    }

    return (
        <div className="navbar">
            <h3 style={{color: 'lightcyan'}}>MealIt</h3>
            <div className="menu">
                <ul>
                    {/* <li><Link className="navLink">Favorites</Link></li> */}
                    {/* <li><Link className="navLink">Searches</Link></li> */}
                    {/* <li><Link className="navLink">Account</Link></li> */}
                    {(localStorage.getItem('user') == null) ?<li><Link className="navLink" key={'login'}to={'/login'}>Login</Link></li>
                    :<li><Link className="navLink" onClick={()=> logOut()}>Logout</Link></li>}
                </ul>
            </div>
        </div>
    )
}

export default NavBar;
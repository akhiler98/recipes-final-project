import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "./ProfileDropdown";
import FavouriteContext from "./FavouriteContext";
import BurgerIconWindow from "./BurgerIconWindow";

function Header() {
  const [searchItem, setSearchItem] = useState('');


  const[dropdown,setDropdown] = useState(false)
  const { user, getUser } = useContext(UserContext);
  const {additemsToFavourites,active,setActive,userActive,setUserActive, setBurgericon,burgericon} = useContext(FavouriteContext);
  const navigate = useNavigate()

  const logout = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post("/logout");
        getUser();
        navigate('/')
    } catch (error) {
          console.log(error);
        }
    }





    

    const handleChange = async (event) => {
        setSearchItem(event.target.value);
    }


 
  

  return (
    <>

    {
      dropdown ?
      <ProfileDropdown setDropdown={setDropdown} logout={logout}/>
      :
      ""
    }
    {
      burgericon == true ?

      <BurgerIconWindow logout={logout} setBurgericon={setBurgericon}/>
      :
      ""
    }
    <div className="navbar" style={{opacity: active== true || userActive == false || burgericon== true ? 0.3 : '',backgroundColor: active== true || userActive == false ? "darkgrey" : ''}}>
        <div className="navbar-content">
            <h3>DELICIOUS</h3>
            <div className="navbar-search_container">
              <input type="text" className='navbar_search' placeholder='search for recipes' onChange={handleChange}/>

              <Link to={`/simpleSearch/${searchItem}`} className="search-iconLink">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
               </Link>
            </div>
        </div>
    
    <div className="header-links">
        <Link className="header-link" to="/">Home</Link>|
        <Link className="header-link" to="/add-recipe">Add your recipe</Link>|
                                                          
                                                          
                                                                
                                                            
        <Link className="header-link" to="/favourites">Favourite</Link>|

        {
        user ? 
        <>
        <div className="header-profile" onMouseEnter={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
           <div className="header-profile-iconCircle">
             <FontAwesomeIcon icon={faUser} className="user-icon"  />
            </div>
            <p>{user.name}</p>
            <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon"/>
        </div>
        
        </>
        :
        <>
        <div className="header-profile-login">
          <div className="header-profile-iconCircle">
          <FontAwesomeIcon icon={faUser} className="user-icon"  />
          </div>
         <Link className="header-link" to="/login">Login</Link> 
        </div>
        </>
        
        }
        
    </div>

    <div className="burger-icon" onClick={()=>{setBurgericon(true)}}>
      <div className="burger-icon_line"></div>
      <div className="burger-icon_line"></div>
      <div className="burger-icon_line"></div>
    </div>
   
</div>
</>
  )
}

export default Header
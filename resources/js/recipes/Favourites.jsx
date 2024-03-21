import "./Favourites.scss";
import UserContext from "./UserContext";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Favourites() {
    const [favourites, setFavourites] = useState([]);
    const { user } = useContext(UserContext);
    console.log(user);

    const displayFavourites = async () => {
        const response = await fetch(`/api/showFavourites/${user.id}`);
        const data = await response.json();
        setFavourites(data);
    };

    const removeRecipe = async (recipe_id) => {
        const response = await fetch(
            `/api/removeFavourites/${user.id}/${recipe_id}`
        );
        const data = await response.json();
        displayFavourites();
    };

    useEffect(() => {
        if (user) {
            displayFavourites();
        }
    }, [user]);

    return (
        <>
            {user ? (
                <div className="favourites-container">
                    <div className="favourites-container_heading">
                        <div className="user-info">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="user-icon"
                            />
                            <br />
                            <p className="user-name">Hello {user.name}</p>
                        </div>

                        <h1>All Saved Items</h1>
                        <p>All your Favourite Content In One Place</p>
                    </div>

                    <div className="favourites-container_list">
                        {
                            //  favourites.id ?

                            favourites.map((item) => {
                                return (
                                    <>
                                        <div className="cards">
                                            <div
                                                className="card-remove"
                                                onClick={() => {
                                                    removeRecipe(item.id);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faMinus}
                                                />
                                            </div>

                                            <div className="cards_imageContainer">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className="cards_content">
                                                <p>{item.title}</p>
                                                <h2>{item.title}</h2>
                                                <p>{item.cooking_time}</p>
                                            </div>
                                        </div>
                                    </>
                                );
                            })
                            // :
                            // <div className="ifthereIs-noRecipes">
                            //   <h1>There is no saved Recipes in you Favourites </h1>
                            //   <Link className="ifthereIs-noRecipes_links" to={'/indian'}>View All Recipes</Link>
                            // </div>
                        }
                    </div>
                </div>
            ) : (
                <div className="favouritsSecond-container">
                    <div className="favouritsSecond-container_image">
                        <img
                            src="https://marketplace.canva.com/NqqlA/MAFmARNqqlA/1/s2/canva-indian-food-MAFmARNqqlA.jpg"
                            alt=""
                        />
                    </div>
                    <div className="favouritsSecond-container_content">
                        <h1>Login or Signup to see your Favourites Recipes</h1>
                        <Link
                            to={"/login"}
                            className="favouritsSecond-container_link"
                        >
                            Login
                        </Link>
                        <Link
                            to={"/register"}
                            className="favouritsSecond-container_link"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default Favourites;
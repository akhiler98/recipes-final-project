import { useEffect, useState } from "react";
import "./UyghurCuisine.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function UyghurCuisine() {
    const [uyRecipes, setUyRecipes] = useState([]);

    const loadRecipes = async () => {
        const response = await fetch("/api/uyghur-cuisine");
        const data = await response.json();

        setUyRecipes(data);
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    return (
        <div className="container">
            <div className="img_box">
                <img
                    src="/img/uyghurcuisine-bg.jpeg"
                    alt="uybg"
                    className="uyghur_img"
                />
            </div>
            <h1 className="uyghur_title">Uyghur Cuisine</h1>
            <div className="menu_container">
                {uyRecipes.map((uyRecipe, i) => {
                    return (
                        <div className="menu_item" key={i}>
                            <div className="heart-iconDiv">
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className="heart-icon"
                                />
                            </div>
                            <Link to={`/cuisine/${uyRecipe.id}`}>
                                <img
                                    src={uyRecipe.image}
                                    className="menu_img"
                                />
                            </Link>
                            <div className="menu_content">
                                <p className="category">
                                    {uyRecipe.difficulty_level}
                                </p>
                                <h2 className="menu_title">{uyRecipe.title}</h2>
                                <p className="cooking_time">
                                    {uyRecipe.cooking_time}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div className="menu_item"></div>
            </div>
        </div>
    );
}

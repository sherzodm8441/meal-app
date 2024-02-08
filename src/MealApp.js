import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import IngredientList from "./IngredientList";
import './index.css';
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from "@mui/material/colors";
import Modal from "./Modal";


function MealApp(){
    let userObj = JSON.parse(localStorage.getItem('user'));

    const [ingredients, setIngredients] = useState(JSON.parse(localStorage.getItem('ingredients')) || []);
    const [recipe, setRecipe] = useState(JSON.parse(localStorage.getItem('recipe')) || []);
    const [recipes, setRecipes] = useState([])
    const [hearts, setHearts] = useState((userObj && userObj.favorites) ? userObj.favorites : []);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [modal, setModal] = useState(false);


    function handleModal(){
        setModal(false);
    }

    function addIngredient(item){
        if(!(ingredients.includes(item))){
            setIngredients((prev) => [...prev, item]);
        }
    }

    function deleteIngredient(item){
        setIngredients(prevIngredients => prevIngredients.filter(prevIngredient => prevIngredient !== item));
    }


    async function updateHearts(id){
        if(!localStorage.getItem('user')){
            setModal(true);
            return;
        }

        let index = hearts.findIndex(({recipeId})=>{
            return recipeId == id;
        })

        let arr = [];

        if(index > -1){
            arr = [...hearts];
            arr.splice(index, 1)
            
        }else{
            arr = [...hearts];
            arr.push({
                recipeId: id,
                fav: true
            })
            
        }

        let data = JSON.stringify({
            "favorites": arr,
        });


        let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'https://meal-app-backend-ihtf.onrender.com/api/user',
        headers: { 
            'token': `Bearer ${user.accessToken}`, 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
            console.log(response.data);
            let userObj = {...response.data, accessToken: user.accessToken};
            localStorage.setItem("user", JSON.stringify(userObj));
            setUser(JSON.parse(localStorage.getItem('user')));
            setHearts(response.data.favorites);

        })
        .catch((error) => {
        console.log(error);
        });

        console.log(hearts);
        console.log(user)

    }

    useEffect(() => {
        localStorage.setItem("ingredients", JSON.stringify(ingredients));
    }, [ingredients])
    
    async function getRecipeSpoon(){
        await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            headers: {
                'Content-Type': 'application/json',
            },
            params: { 
                apiKey: process.env.REACT_APP_SPOONACULAR_KEY,
                ingredients: "" + ingredients.join(","),    
                number: 10,
                limitLicense: true,
                ranking: 2,
                ignorePantry: true
            }
            })
            .then(response => {
                setRecipe(response.data);
                localStorage.setItem("recipe", JSON.stringify(response.data));
                console.log(response.data); 
            })
            .catch(error => {
                console.log(error)
            }
        );
    }
    
    useEffect(() => {
        setRecipes(
            recipe.map((currElem) => {
                return <div className="link">
                    <div className="linkNHeart">
                        <Link id="link" key={currElem["id"]} to={`/recipes/${currElem["id"]}`} state={{data : currElem}}>{currElem["title"]}</Link>
                        <FavoriteIcon 
                            onClick={()=> updateHearts(currElem["id"])}
                            style={{color: ((hearts.some((obj)=>obj.recipeId === currElem["id"])) ? "hotPink" : "lightCyan")}}
                        />
                    </div>
                    <div className="imgContainer">
                        <img src={currElem["image"]} alt={currElem["title"]} className="image"/>
                    </div>
                    <p>Ingredients from your list: {currElem["usedIngredientCount"]}</p>
                    </div>
            })
        )

        console.log(hearts)
    },[recipe, hearts])


    return(
        <React.Fragment>
            <div className="view">
                <div className="sideBar">
                    <div>
                        <SearchBar 
                            addIngredient={addIngredient}
                        />
                    </div>
                    <div className="ingBox">
                        <h4 id="ingTitle">Your ingredients list</h4>
                        <IngredientList 
                            className="ingredientList"
                            ingredients={ingredients}
                            deleteIngredient={deleteIngredient}
                        />
                    </div>
                    <button id="spoonBtn" onClick={() => getRecipeSpoon()}>Get Recipes</button>
                    {/* <button id="spoonBtn" onClick={() => getVideo()}>Get video</button> */}
                </div>

                <div className="recipesView">
                    <div className="links">{recipes}</div>
                </div>
                <Modal value={modal} handleModal={handleModal}/>
            </div>
        </React.Fragment>
    );
}

export default MealApp;

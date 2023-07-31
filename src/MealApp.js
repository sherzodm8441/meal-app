import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import IngredientList from "./IngredientList";
import './index.css';
import { Link } from "react-router-dom";
import { callData } from "./TestCall";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from "@mui/material/colors";


function MealApp(){
    const [ingredients, setIngredients] = useState(JSON.parse(localStorage.getItem('ingredients')) || []);
    // const [recipe, setRecipe] = useState(JSON.stringify(callData, null, 2));
    const [recipe, setRecipe] = useState(JSON.parse(localStorage.getItem('recipe')) || []);
    const [recipes, setRecipes] = useState([])
    const [hearts, setHearts] = useState(JSON.parse(localStorage.getItem("hearts")) || {});
    // const [ratings, setRatings] = useState({});


    function addIngredient(item){
        if(!(ingredients.includes(item))){
            setIngredients((prev) => [...prev, item]);
        }
    }

    function deleteIngredient(item){
        setIngredients(prevIngredients => prevIngredients.filter(prevIngredient => prevIngredient !== item));
    }

    function initialHearts(){
        recipe.forEach(element => {
            let id = element["id"];
            console.log(id)
            if(!hearts[id]){
                let obj = {...hearts};
                obj[id] = false
                setHearts(obj);
            }
        })
        console.log(hearts)
    }

    // function updateRatings(id, event){
    //     let obj = {...ratings};
    //     obj[id] = event.target.value;
    //     setRatings(obj);
    // }

    function updateHearts(id){
        let obj = {...hearts};
        obj[id] = !obj[id];
        console.log(obj[id]);
        setHearts(obj);
    }

    useEffect(() => {
        localStorage.setItem("ingredients", JSON.stringify(ingredients));
    }, [ingredients])

    useEffect(() => {
        localStorage.setItem("hearts", JSON.stringify(hearts));
    }, [hearts]);
    
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
                // setRecipe(JSON.stringify(response.data, null, 2));
                setRecipe(response.data);
                localStorage.setItem("recipe", JSON.stringify(response.data));
                console.log(response.data); 
            })
            .catch(error => {
                console.log(error)
            }
        );
    }
    async function getVideo(){
        await axios.get('https://youtube.googleapis.com/youtube/v3/search', {
            params: {  
                q: "how to make pizza",
                key: process.env.REACT_APP_YT_KEY
            }
            })
            .then(response => {
                // setRecipe(JSON.stringify(response.data, null, 2));
                // setRecipe(response.data);
                // localStorage.setItem("recipe", JSON.stringify(response.data));
                console.log(response.data); 
            })
            .catch(error => {
                console.log(error)
            }
        );
    }

    useEffect(()=> {
        initialHearts()
        console.log(hearts)

    }, [recipe])

    useEffect(() => {
        setRecipes(
            recipe.map((currElem) => {
                return <div className="link">
                    <div className="linkNHeart">
                        <Link id="link" key={currElem["id"]} to={`/recipes/${currElem["id"]}`} state={{data : currElem}}>{currElem["title"]}</Link>
                        <FavoriteIcon 
                            onClick={()=> updateHearts(currElem["id"])}
                            style={{color: (hearts[currElem["id"]] ? "hotPink" : "lightCyan")}}
                        />
                    </div>
                    <img src={currElem["image"]} alt={currElem["title"]} className="image"/>
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
                    <button id="spoonBtn" onClick={() => getRecipeSpoon()}>Get recipe Spoon</button>
                    <button id="spoonBtn" onClick={() => getVideo()}>Get video</button>
                </div>

                <div className="recipesView">
                    <div className="links">{recipes}</div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default MealApp;


// function getRecipe(){
//         axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`)
//                 .then(res => {
//                     setRecipe(res.data.meals);
//                     console.log(res.data.meals);
//                 })
//                 .catch(err => console.log(err)) 
//     }

    // console.log(process.env.REACT_APP_SPOONACULAR_KEY);

    //<pre>{JSON.stringify(meal?.meals[0], null, 2)}</pre>

    // setRecipes([
        //     <Link  to={`/recipes/${callData[0]["id"]}`} state={{data : callData}}>book</Link>
        // ])

        // setRecipes([
        //     <Link  to="/recipes/1">book</Link>,
        //     <Link  to="/recipes/2">book</Link>,
        //     <Link  to="/recipes/3">book</Link>,
        //     // <Link key={4} to="/recipes/4">book</Link>
        // ])
        // {/* <Link to="/recipes/1">book</Link> */}
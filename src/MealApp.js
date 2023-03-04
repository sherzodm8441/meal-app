import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import IngredientList from "./IngredientList";

function MealApp(){
    const [ingredients, setIngredients] = useState([]);


    function addIngredient(item){
        if(!(ingredients.includes(item))){
            setIngredients((prev) => [...prev, item]);
        }
    }

    function deleteIngredient(item){
        setIngredients(prevIngredients => prevIngredients.filter(prevIngredient => prevIngredient !== item));
    }



    // useEffect(() => {
    //     axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`)
    //         .then(res => {
    //             SetMeal(res.data);
    //             console.log(res.data);
    //         })
    //         .catch(err => console.log(err)) 
    // }, []);

    // console.log(process.env.REACT_APP_SPOONACULAR_KEY);

    //<pre>{JSON.stringify(meal?.meals[0], null, 2)}</pre>

    return(
        <React.Fragment>
            <SearchBar 
                addIngredient={addIngredient}
            />
            <IngredientList 
                ingredients={ingredients}
                deleteIngredient={deleteIngredient}
            />
        </React.Fragment>
    );
}

export default MealApp;
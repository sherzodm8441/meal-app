import { useState } from "react";
import Button from '@mui/material/Button';

function IngredientList(props){


    return(
        <div className="ingredientList">
            {
                props.ingredients.map((ingredient) => {
                    return( <div className="listIng">
                        <p className="addedPTag">{ingredient}</p>
                        <button className="deleteButton" type="button" onClick={()=> props.deleteIngredient(ingredient)}>x</button>
                        </div>)
                })
            }
        </div>
    );
}

export default IngredientList;
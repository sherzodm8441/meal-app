import { useState } from "react";
import Button from '@mui/material/Button';

function IngredientList(props){


    return(
        <div className="ingredientList">
            {
                props.ingredients.map((ingredient) => {
                    return( <div>
                        <p>{ingredient}</p>
                        <div><Button 
                        size="small"
                        onClick={()=> props.deleteIngredient(ingredient)}
                        >Delete</Button></div>
                        </div>)
                })
            }
        </div>
    );
}

export default IngredientList;
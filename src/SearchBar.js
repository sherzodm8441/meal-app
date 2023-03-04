import { useState } from "react";
import { ingredientsArray } from "./SearchData";
import SearchIcon from '@mui/icons-material/Search';
import './index.css';
import Button from '@mui/material/Button';

function SearchBar(props){
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    function handleFilter(event){
        const inputWord = event.target.value;
        setSearchWord(inputWord);
        console.log(searchWord, inputWord);
        const filtered = ingredientsArray.filter((value) => {
            return value.toLowerCase().includes(inputWord.toLowerCase());
        });

        if(inputWord === ""){
            setFilteredIngredients([]);
        }else{
            setFilteredIngredients(filtered);
        }
    }

    return(
        <div className="search">
            <div className="searchInput">
                <input 
                    type="text"
                    value={searchWord}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    <SearchIcon />
                </div>
            </div>
            <div className="searchResult">
                {filteredIngredients.slice(0,15).map((ingredient) => {
                    return (<div>
                        <div className="ingredient"><p>{ingredient}</p></div>
                        <div><Button 
                        size="small"
                        onClick={()=> props.addIngredient(ingredient)}
                        >Add</Button></div>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default SearchBar;
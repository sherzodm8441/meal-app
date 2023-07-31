import { useState, useEffect } from "react";
import { ingredientsArray } from "./SearchData";
import SearchIcon from '@mui/icons-material/Search';
import './index.css';
import Button from '@mui/material/Button';

function SearchBar(props){
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    function handleFilter(){
        if (searchWord === "") {
            setFilteredIngredients([]);
          } else {
            const filtered = ingredientsArray.filter((value) => 
                (value.toLowerCase().startsWith(searchWord.toLowerCase()))
            );
            setFilteredIngredients(filtered);
          }
    }

    useEffect(() => {
        handleFilter();
    }, [searchWord]);
    

    return(
        <div className="search">
            <div className="searchInput">
                <div className="searchIcon">
                    <SearchIcon style={{ color: "lightcyan" }} />
                </div>
                <input 
                    className="searchBox"
                    type="text"
                    value={searchWord}
                    placeholder="Search for you ingredients"
                    onChange={(event) => setSearchWord(event.target.value)}
                />
            </div>
            {searchWord && <div className="searchResult">
                {filteredIngredients && filteredIngredients.slice(0,15).map((ingredient) => {
                    return (<div className="searchIng">
                        <div className="ingredient"><p className="ingPTag">{ingredient}</p></div>
                        <button className="addButton" type="button" onClick={()=> {props.addIngredient(ingredient)
                                        setSearchWord("");
                        }}>+</button>
                    </div>)
                })}
            </div>}
        </div>
    )
}

export default SearchBar;
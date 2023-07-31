import { useLocation, useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";


function Recipe(){
    const location = useLocation();
    const { data } = location.state;
    const [ratings, setRatings] = useState(JSON.parse(localStorage.getItem("ratings")) || {});
    const [videos, SetVideos] = useState(JSON.parse(localStorage.getItem("videos")) || {});

    useEffect(()=>{
        if(!videos[data["id"]]){
            getVideo();
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem("ratings", JSON.stringify(ratings));
    }, [ratings])

    function updateRatings(id, event){
        let obj = {...ratings};
        console.log(event.target.value);
        obj[id] = event.target.value;
        setRatings(obj);
    }

    async function getVideo(){
        await axios.get('https://youtube.googleapis.com/youtube/v3/search', {
            params: {  
                q: data["title"],
                key: process.env.REACT_APP_YT_KEY
            }
            })
            .then(response => {
                let obj = {...videos};
                obj[data["id"]] = [...response.data.items];
                SetVideos(obj);
                console.log(response.data.items); 
            })
            .catch(error => {
                console.log(error)
            }
        );
    }

    useEffect(()=> {
        localStorage.setItem("videos", JSON.stringify(videos));
    }, [videos])

    return (
        <div className="recipe">
            <div className="recipeTitle">
                <h1>{data["title"]}</h1>
            </div>
            <div className="ingredientStatus">
                <div className="usedListsDiv">
                    <h3>Ingredients You Already Have: {data["usedIngredientCount"]}</h3>
                    <ul className="usedLists">
                        {data["usedIngredients"].map((usedIngredient) => {
                            return <li>{usedIngredient["name"]}</li>
                        })}
                    </ul>
                </div>
                <div className="missedListsDiv">
                    <h3>Ingredients You Will Need: {data["missedIngredientCount"]}</h3>
                    <ul className="missedLists">
                    {data["missedIngredients"].map((missedIngredient) => {
                            return <li>{missedIngredient["name"]}</li>
                        })}
                    </ul>
                </div>
            </div>
            <div className="video">
                {videos[data["id"]] && videos[data["id"]].map((video) => {
                    return <div className="iFrame">
                        <iframe 
                            width="560" 
                            height="315" 
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen>
                        </iframe>
                    </div>
                })}
                {/* <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/QY8dhl1EQfI" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                </iframe> */}
            <a rel="noopener noreferrer" href={`https://www.youtube.com/results?search_query=${data["title"]}`} target="_blank">More Videos</a>

            </div>
            {/* <a id="moreVids" rel="noopener noreferrer" href={`https://www.youtube.com/results?search_query=${data["title"]}`} target="_blank">More Videos</a> */}
            <div className="ratings">
                <p>Did you give this recipe a try? Rate it!</p>
                
                <Rating
                    name="simple-controlled"
                    value={ratings[data["id"]] || 0}
                    onChange={(event) => updateRatings(data["id"], event)}
                    // onChange={(event, newValue) => {
                    //     setValue(newValue);
                    //     }}
                />
            </div>
        </div>
    );
}

export default Recipe;
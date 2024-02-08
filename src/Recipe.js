import { useLocation, useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";


function Recipe(){
    let userObj = JSON.parse(localStorage.getItem('user'));

    const location = useLocation();
    const { data } = location.state;
    const [ratings, setRatings] = useState((userObj && userObj.ratings) ? userObj.ratings : []);
    const [videos, SetVideos] = useState(JSON.parse(localStorage.getItem("videos")) || {});
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [modal, setModal] = useState(false);

    function handleModal(){
        setModal(false);
    }


    useEffect(()=>{
        if(!videos[data["id"]]){
            getVideo();
        }
    }, [])

    async function updateRatings(id, event){
        if(!localStorage.getItem('user')){
            setModal(true);
            return;
        }

        let index = ratings.findIndex(({recipeId})=>{
            return recipeId == id;
        })

        let arr = [];
        arr = [...ratings];

        if(index > -1){
            arr.splice(index, 1)
        }
        
        console.log(event.target.value);
        arr.push({
            recipeId: id,
            rating: event.target.value
        });
        

        let data = JSON.stringify({
            "ratings": arr,
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
            setRatings(response.data.ratings);

        })
        .catch((error) => {
        console.log(error);
        });

        
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
                    return <div style={{border: "1px solid black", 
                    borderRadius: "10px", 
                    overflow: "hidden",
                    margin: "10px",
                    height: "100%",
                    width: "auto",
                    paddingBottom: "0",
                    backgroundColor: "black"}} className="iFrame">
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
                
            <a rel="noopener noreferrer" href={`https://www.youtube.com/results?search_query=${data["title"]}`} target="_blank">More Videos</a>

            </div>
            
            <div className="ratings">
                <p>Did you give this recipe a try? Rate it!</p>
                
                <Rating
                    name="simple-controlled"
                    value={(ratings && ratings.some(obj => { return obj.recipeId === data["id"]})) ? ratings.find(obj => { return obj.recipeId === data["id"]}).rating  : 0}
                    onChange={(event) => updateRatings(data["id"], event)}
                />
            </div>
            <Modal value={modal} handleModal={handleModal}/>
        </div>
    );
}

export default Recipe;
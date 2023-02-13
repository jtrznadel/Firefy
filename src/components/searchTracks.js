import React from 'react';
import axios from 'axios';
function searchTracks(listOfIds) {
    let list = [];
    listOfIds.forEach(id => {
         const foo = async () => {
            const {data} = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                params:{
                    market: "PL",
                }
        })
        list.push(data);
    }
    console.log(list);
    return list;
})
}

export default searchTracks;
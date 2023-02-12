import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import  "../App.css";
import { useState } from 'react';
import axios from 'axios';


function SideBar() {
    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState("");

    const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })
        setArtists(data.artists.items)
    }

    const renderArtists = () => {
        return Object.entries(artists).map(([key, artist], i) => {
			return (
				<div key={key}>
					{artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                    {artist.name}
				</div>
			)
		})
    }

    return ( 
        <div className="d-flex flex-column flex-shrink-0 p-3 text-orange bg-light sideBar">
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                <div className="nav-item wrapper">
                    <i className='icon'><FontAwesomeIcon icon={faMagnifyingGlass}/></i>
                    <form onChange={searchArtists}>
                    <input type="text" className="input" placeholder="Search Songs" onChange={e => setSearchKey(e.target.value)}/>
                    <button type="submit">Search</button>
                    </form>
                </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link link-dark" aria-current="page" href="/">Favorites</a>
                </li>
            </ul>
            {renderArtists()}
        </div>
     );
}

export default SideBar;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import  "../App.css";
import { useState } from 'react';
import axios from 'axios';

function SideBar() {
    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState("");
    const [tracks, setTracks] = useState("");
    const [artistId, setArtistId] = useState("");

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
        setArtistId(data.artists.items.at(0).id)
        setArtists(data.artists.items)
    }

    const searchTracks = async (id) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            params:{
                market: "PL",
            }
    })
    setTracks(data.tracks)
    }

    const renderTracks = () => {
        return Object.entries(tracks)?.map(([key, track], i) => {
            let featuring = ''
            return <div className='row'>
                <div className='col-md-2'>
                    <img src={track.album.images[0].url} className="trackImg inline-block p-2 cursor-pointer"/>
                </div>
                <div className="col-md-10 pt-3">
                <h5>{track.name}</h5>
                {track.artists.forEach(element => {
                    featuring += `${element.name}, `
                })}
                {featuring = featuring.slice(0, -2)}
                <h7>{featuring}</h7>
                
                </div>
            </div>
        })}

    const searchedArtist = !artists.length ? false : artists.at(0)
    const renderArtists = () => {
        searchArtists()
        searchTracks(artistId)
        return Object.entries(artists)?.map(([key, artist], i) => {
			return (
                <div className='card1 text-center hover:scale-105 ease-in-out duration-300' id={key}>
                    <figure id={key}>
                    {artist.images.length ? <img src={artist.images[0].url} className="artistImg w-[220px] inline-block p-2 cursor-pointer"/> : <div>No image</div>}
                    <figcaption>{artist.name}</figcaption>
                    </figure>
                </div>

                    
			)
		})
    }


    const renderGenres = () => {
        const genres = searchedArtist.genres;
        return genres.map((genre, i) => {
            return <h5>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h5>
        })
    }

    return ( 
        <div className="container-fluid pl-0 g-0">
        <div className="row">
          <div className="col-md-3">
          <div className="d-flex flex-column flex-shrink-0 text-orange bg-light sideBar">
            <ul className="nav nav-pills flex-column mb-auto ">
                <li className="nav-item">
                <div className="nav-item wrapper">
                    <i className='icon'><FontAwesomeIcon icon={faMagnifyingGlass}/></i>
                    <form onChange={searchArtists}>
                    <input type="text" className="input" placeholder="Search for Artists" onChange={e => setSearchKey(e.target.value)}/>
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
        </div>
          </div>
          <div className="col-md-9">
            {searchedArtist ?
            <div className='Container'>
                <div className="row mt-4">
                    
                    <div className="col-md-6">
                    <h2>Najlepszy wynik</h2>

                    <div className="artistBox">
                        <div className="row">
                            <div className="col-md-4">
                            <img src={searchedArtist.images[0].url} className="artistImg"></img>
                            </div>
                            <div className="col-md-8 text-end artistName">
                            {searchedArtist.name}
                            <div className="genres text-end">
                               {renderGenres()}
                            </div>
                            </div>
                        </div>
                    </div>
                
                    </div>
                    <div class="col-md-6">
                        <h2>Utwory</h2>
                        <div className="tracksBox">
                         {renderTracks()}
                        </div>
                    </div>
                </div>
                <hr />
                    <h2>Podobni wykonawcy</h2>
                    <div className="scrolling-wrapper">
                        {renderArtists()}
                    </div>
                </div>
 : <h1>Brak danych</h1>}
          </div>
        </div>
      </div> 
        
     );
}

export default SideBar;
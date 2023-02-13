import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import  "../App.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

function SideBar() {
    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState("");
    const [tracks, setTracks] = useState("");
    const [artistId, setArtistId] = useState(""); 
    const [selectedIds, setSelectedIds] = useState(() => {
          const storedIds = localStorage.getItem('selectedIds');
          return storedIds ? JSON.parse(storedIds) : [];
        });
      
        const itemExists = (item) => {
            const items = JSON.parse(localStorage.getItem("selectedIds")) || [];
            return items.some((storedItem) => storedItem.id === item.id)
                                             
          };
        
          const removeItem = (item) => {
            const items = JSON.parse(localStorage.getItem("selectedIds")) || [];
            const updatedItems = items.filter((storedItem) => storedItem.id !== item.id)
                                                               
            localStorage.setItem("selectedIds", JSON.stringify(updatedItems));
          };

          const handleIconClick = (track) => {
            if (itemExists(track)) {
              removeItem(track);
              setSelectedIds(JSON.parse(localStorage.getItem("selectedIds")));
            } else {
              setSelectedIds([...selectedIds, track]);
              localStorage.setItem('selectedIds', JSON.stringify([...selectedIds, track]));
            }
          };


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
        console.log(searchKey)
        return Object.entries(tracks)?.map(([key, track], i) => {
            let featuring = ''
            const url = track.external_urls.spotify ? track.external_urls.spotify : '/'
            const iconStyle = itemExists(track) ? {color: 'orange' }: {color: 'black'}
            return <a href={url} target="_blank">
                <div className='row trackRow' id={key}>
                <div className='col-md-2'>
                    <img src={track.album.images[0].url} className="trackImg inline-block p-2 cursor-pointer"/>
                </div>
                <div className="col-md-7 mt-1">
                <h5>{track.name}</h5>
                {track.artists.forEach(element => {
                    featuring += `${element.name}, `
                })}
                {featuring = featuring.slice(0, -2)}
                
                </div>
                
                <div className={`col-md-1 pt-4 favoriteIcon`} style={iconStyle} onClick={(e) => {handleIconClick(track); e.preventDefault()}}>
                    <FontAwesomeIcon icon = {faHeart} />
                </div>
                
            </div>
            </a>
        })}

    const searchedArtist = !artists.length ? false : artists.at(0)
    const searchedArtistUrl = searchedArtist ? searchedArtist.external_urls.spotify : '/'
    const renderArtists = () => {
        searchTracks(artistId)
        return Object.entries(artists)?.map(([key, artist], i) => {
            const url = artist.external_urls.spotify ? artist.external_urls.spotify : '/'
			return (
                <a href={url} target="_blank">
                <div className='card1 text-center hover:scale-105 ease-in-out duration-300' id={key}>
                    <figure id={key}>
                    {artist.images.length ? <img src={artist.images[0].url} className="artistImg1 w-[220px] inline-block p-2 cursor-pointer"/> : <div>No image</div>}
                    <figcaption className="artistsName">{artist.name}</figcaption>
                    </figure>
                </div>
                </a>
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
          <div className="d-flex flex-column flex-shrink-0 text-grey bg-light sideBar">
            <ul className="nav nav-pills flex-column mb-auto ">
                <li className="nav-item">
                <div className="nav-item wrapper">
                    <i className='icon'><FontAwesomeIcon icon={faMagnifyingGlass}/></i>
                    <form onChange={searchArtists}>
                    <input type="text" className="input" placeholder="Search for Artists" onChange={e => setSearchKey(e.target.value)}/>
                    </form>
                </div>
                </li>
            </ul>
            <div className='mb-2 '>
            <hr/>
            <p>© 2023 Jakub Trznadel</p>
        </div>
        </div>
        
          </div>
          <div className="col-md-9">
        {searchKey ? <div>
            {searchedArtist ?
            <div className='Container'>
                <div className="row mt-4">
                    
                    <div className="col-md-6">
                    <h2>Najlepszy wynik</h2>
                    <a href={searchedArtistUrl} target="_blank">
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
                    </a>
                    </div>
                    <div className="col-md-6">
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
 :              <div className='noData text-center'>Zacznij od wyszukania artysty</div>}</div>
 :             <div className='noData text-center'>Zacznij od wyszukania artysty</div>}
          </div>
        </div>
      </div> 
        
     );
    }

export default SideBar;
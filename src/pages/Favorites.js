import WelcomeSpan from "../components/WelcomSpan";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react';


export default function Favorites(){
    const [isTokenPresent, setIsTokenPresent] = useState(false);
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('selectedIds');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
      });

        console.log(favorites)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        setIsTokenPresent(true);
        }
    }, []);

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
          setFavorites(JSON.parse(localStorage.getItem("selectedIds")));
        } else {
          setFavorites([...favorites, track]);
          localStorage.setItem('selectedIds', JSON.stringify([...favorites, track]));
        }
      };
    
    const renderTracks = () => {
        return Object.entries(favorites)?.map(([key, track], i) => {
            let featuring = ''
            const url = track.external_urls.spotify ? track.external_urls.spotify : '/'
            const iconStyle = itemExists(track) ? {color: 'orange' }: {color: 'black'}
            return <a href={url} target="_blank">
                <div className='row trackRow' id={key}>
                <div className='col-md-1'>
                    <img src={track.album.images[0].url} className="trackImg inline-block p-2 cursor-pointer"/>
                </div>
                <div className="col-md-7 mt-2">
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
        })
    }


    return <div>
        {isTokenPresent ? 
            <div className="container-fluid pl-0 g-0">
            <div className="row">
              <div className="col-md-3">
              <div className="d-flex flex-column flex-shrink-0 text-grey bg-light sideBar">
                <ul className="nav nav-pills flex-column mb-auto ">
                    <li className="nav-item">
                    <div className="nav-item wrapper">
                    </div>
                    </li>
                </ul>
                <div className='mb-2 '>
                <hr/>
                <p>© 2023 Jakub Trznadel</p>
            </div>
            </div>
              </div>
              <div className="col-md-9 ">
                <h1>Twoje ulubione kawałki:</h1>
                <div className="favList">
                {renderTracks()}
                </div>
              </div>
            </div>
          </div> 
        
        : <WelcomeSpan/>}
    </div>
}
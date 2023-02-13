import SideBar from "../components/SideBar";
import WelcomeSpan from "../components/WelcomSpan";
import React, { useState, useEffect } from 'react';


export default function Discover(){
    const [isTokenPresent, setIsTokenPresent] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        setIsTokenPresent(true);
        }
    }, []);
    
    return <div className="view">
        {!isTokenPresent ? <WelcomeSpan/> : <SideBar/>}
    </div>
}
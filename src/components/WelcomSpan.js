import React from 'react';
import Container from'react-bootstrap/Container';
function WelcomeSpan() {
    return ( 
        <Container className = "justify-center align-items-center welcomeContainer">
            <h1 className = "text-center textSpecial mt-5">Witaj w Fire<span className = "text-warning">Fy</span>!</h1><br/>
            <h3 className='text-center'>Jesteśmy aplikacją bazującą na Spotify API</h3>
            <h4 className='text-center mt-5'>Dzięki nam dowiesz się wszystkiego na temat danego artysty - przejrzysz jego utwory oraz znajdziesz podobnych wykonawców</h4>
            <h4 className='text-center mt-5'>Ponadto nasza aplikacja przekieruje Cię bezpośrednio do konkretnego utworu w serwisie Spotify</h4>
            <h4 className='text-center mt-5'>Utworzysz równiez listę ulubionych utworów, więc wszystkie interesujące Cię kawałki będziesz miał zawsze na wyciągnięcie ręki!</h4>
            <h2 className='text-center mt-5'>Zacznij od zalogowania się!</h2>
        </Container>
     );
}

export default WelcomeSpan;
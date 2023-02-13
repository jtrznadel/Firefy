import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";
import Discover from "./pages/Discover";
import Favorites from "./pages/Favorites";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";


function App() {

  return (
    <>
    <NavBar />
    <div className="containerMain">
      <Routes>
        <Route path="/" element={<Discover/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;

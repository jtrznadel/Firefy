import "bootstrap/dist/css/bootstrap.min.css"
import Container from 'react-bootstrap/Container'
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import "./App.css";



function App() {

  return (
    <div className="App">
      <NavBar />
      <SideBar />
    </div>
  );
}

export default App;

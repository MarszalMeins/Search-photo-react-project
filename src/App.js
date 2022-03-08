import Home from "./pages/home";
import Resoults from "./pages/resoults";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />}/>
          <Route path = "/resoults" element = {<Resoults />}/>
          <Route path = "*" element = {<Home />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;

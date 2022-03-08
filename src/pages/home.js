import React from "react";
import Welcome from "../components/Welcome_notification";
import Search from "../components/Search";

import "./home.css"

function Home() {
  
    return (
      <div className="home_overlay">
        <Welcome />
        <Search />
      </div>
    )
}
    
export default Home;
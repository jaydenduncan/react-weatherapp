import React from "react";
import "./css/SearchBar.css";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function SearchBar({showResults, hideResults, mainInfo}){
    var toggleUnitSettings = () => {
        let settingsSection = document.getElementById("settingsSection");
        
        if(settingsSection.style.display === "none"){
            settingsSection.style.display = "block";
        }
        else{
            settingsSection.style.display = "none";
        }
    }

    return (
        <div className="topHeading">
            <div className="searchSection">
                <input id="inputCity" type="text" placeholder="&#xf002; Search a city" 
                onInput={showResults} onBlur={hideResults} autoComplete="off" />
                <div id="searchResultSection" className="searchResultSection"></div>
            </div>
            <FontAwesomeIcon id="settingsIcon" className="settingsIcon" icon={faBars} onClick={toggleUnitSettings}/>
        </div>
    );
}

export default SearchBar;
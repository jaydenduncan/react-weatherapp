import React from "react";
import "./css/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import 'font-awesome/css/font-awesome.min.css';

function SearchBar({getWeatherInfo, showResults, hideResults}){
    return (
        <div className="searchSection">
            <input id="inputCity" type="text" placeholder="&#xf002; Search a city" 
            onInput={showResults} onBlur={hideResults} />
            <div id="searchResultSection" className="searchResultSection"></div>
        </div>
    );
}

export default SearchBar;
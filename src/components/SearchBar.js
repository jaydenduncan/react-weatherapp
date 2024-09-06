import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({getWeatherInfo, showResults, hideResults}){
    return (
        <div className="searchSection">
            <input id="inputCity" type="text" placeholder="Search a city" 
            onInput={showResults} onBlur={hideResults} />
            <div id="searchResultSection" className="searchResultSection"></div>
            <div className="searchBtn" onClick={() => getWeatherInfo("")}>
                <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
            </div>
        </div>
    );
}

export default SearchBar;
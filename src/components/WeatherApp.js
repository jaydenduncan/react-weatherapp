import React, { useState } from "react";
import './WeatherApp.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import clear_night_icon from './images/clear_night.png';
import cloudy_icon from './images/cloudy.png';
import lightning_icon from './images/lightning.png';
import partly_cloudy_icon from './images/partly_cloudy.png';
import rainy_icon from './images/rainy.png';
import snowy_icon from './images/snowy.png';
import stormy_icon from './images/stormy.png';
import sunny_icon from './images/sunny.png';

function WeatherApp() {

    return (
        <div className="container">
            <p className="appHeading">React Weather App</p>
            <div className="searchSection">
                <input type="text" placeholder="Search a city" />
                <div className="searchBtn">
                    <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
                </div>
            </div>
            <p className="cityName">Los Angeles</p>
            <p className="currentTemp">28&deg;C</p>
            <div className="lowhighHeading">
                <p>Low</p>
                <p>High</p>
            </div>
            <div className="lowhighTemps">
                <p>23&deg;C</p>
                <p>/</p>
                <p>36&deg;C</p>
            </div>
            <div className="weatherIconSpace">
                <img className="weatherIcon" src={sunny_icon} alt="Sunny Icon" />
                <p className="weatherIconDesc">Sunny</p>
            </div>
            <div className="extraInfo">
                <div className="windSpeed">
                    <p className="windSpeedHeading">Wind Speed</p>
                    <p className="windSpeedVal">5</p>
                    <p>mph</p>
                </div>
                <div className="humidity">
                    <p className="humidityHeading">Humidity</p>
                    <p className="humidityVal">37&#37;</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
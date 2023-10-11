import React, { useState, useEffect } from "react";
import './WeatherApp.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import clear_night_icon from './images/clear_night.png';
import cloudy_icon from './images/cloudy.png';
import lightning_icon from './images/lightning.png';
import partly_cloudy_icon from './images/partly_cloudy.png';
import rainy_icon from './images/rainy.png';
import snowy_icon from './images/snowy.png';
import stormy_icon from './images/stormy.png';
import sunny_icon from './images/sunny.png';
import { EventListenerTypes } from "typeorm/metadata/types/EventListenerTypes";

function WeatherApp() {
    const Scale = {
        FAHRENHEIT: 'F',
        CELSIUS: 'C'
    };

    const [city, setCity] = useState("");
    const [currentTemp, setCurrentTemp] = useState(0);
    const [lowTemp, setLowTemp] = useState(0);
    const [highTemp, setHighTemp] = useState(0);
    const [icon, setIcon] = useState("01d");
    const [iconDesc, setIconDesc] = useState("sunny");
    const [windSpeed, setWindSpeed] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [tempSetting, setTempSetting] = useState(Scale.CELSIUS);
    const [loading, setLoading] = useState(false);

    // Define API settings
    const API_KEY = process.env.REACT_APP_API_KEY;

    // Convert temperature from celsius to fahrenheit or vice versa
    const convert = (e) => {
        if(e.target.value == Scale.FAHRENHEIT){
            let newCurrentTemp = ((currentTemp * 9) / 5) + 32;
            let newLowTemp = ((lowTemp * 9) / 5) + 32;
            let newHighTemp = ((highTemp * 9) / 5) + 32;

            setCurrentTemp(newCurrentTemp);
            setLowTemp(newLowTemp);
            setHighTemp(newHighTemp);
            setTempSetting(Scale.FAHRENHEIT);
        }
        else if(e.target.value == Scale.CELSIUS){
            let newCurrentTemp = ((currentTemp - 32) * 5) / 9;
            let newLowTemp = ((lowTemp - 32) * 5) / 9;
            let newHighTemp = ((highTemp - 32) * 5) / 9;

            setCurrentTemp(newCurrentTemp);
            setLowTemp(newLowTemp);
            setHighTemp(newHighTemp);
            setTempSetting(Scale.CELSIUS);
        }
    }

    // Show filtered results of city input
    const showResults = () => {
        var cityInput = document.getElementById("inputCity").value;
        var searchResultSection = document.getElementById("searchResultSection");

        function removeChildren() {
            if(document.getElementById("searchResults")){
                let searchResultsDiv = document.getElementById("searchResults");

                var child = searchResultsDiv.lastElementChild;
                while(child){
                    searchResultsDiv.removeChild(child);
                    child = searchResultsDiv.lastElementChild;
                }
            }
        }

        function fetchData() {
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                if(data["cod"] || data.length === 0){
                    removeChildren();

                    if(!document.getElementById("noResultsText")){
                        let p1 = document.createElement("p");
                        p1.id = "noResultsText";
                        p1.innerHTML = "No results found.";
                        searchResultsDiv.appendChild(p1);
                    }
                }
                else{
                    removeChildren();

                    for(var city of data){
                        let p = document.createElement("p");
                        p.innerHTML = `${city["name"]}, ${city["state"] ? city["state"] : ""} ${city["country"]}`;
                        searchResultsDiv.appendChild(p);

                        // Hook 'click' event to each paragraph element with respective city data
                        p.onmousedown = (function(){
                            let cityInfo = city;

                            return function(){
                                searchResultsDiv.style.display = "none";
                                getWeatherInfo(cityInfo);
                            };
                        })();
                    }
                } 
            })
            .catch(err => console.log(`error ${err}`));

            searchResultsDiv.style.display = "initial"; // display results on screen
        }

        if(!document.getElementById("searchResults")){
            var searchResultsDiv = document.createElement("div");
            
            searchResultsDiv.id = "searchResults";
            searchResultsDiv.className = "searchResults";
            searchResultsDiv.style.display = "none";
            searchResultSection.appendChild(searchResultsDiv);

            fetchData();
        }
        else{
            var searchResultsDiv = document.getElementById("searchResults");

            fetchData();
        }
    };

    // Hide search results when text box is not in focus
    const hideResults = () => {
        var searchResultsDiv = document.getElementById("searchResults");
    
        if(searchResultsDiv){
            searchResultsDiv.style.display = "none";
        }
    };

    // Update screen to match new data
    const updateScreen = (data) => {
        setCity(data["name"]);

        if(tempSetting == Scale.FAHRENHEIT){
            // Set current temp, low temp, and high temp in degrees fahrenheit
            let newCurrentTemp = ((data["main"]["temp"] - 273.15) * 1.8) + 32;
            let newLowTemp = ((data["main"]["temp_min"] - 273.15) * 1.8) + 32;
            let newHighTemp = ((data["main"]["temp_max"] - 273.15) * 1.8) + 32;

            setCurrentTemp(newCurrentTemp);
            setLowTemp(newLowTemp);
            setHighTemp(newHighTemp);
        }
        else{
            // Set current temp, low temp, and high temp in degrees celsius
            let newCurrentTemp = data["main"]["temp"] - 273.15;
            let newLowTemp = data["main"]["temp_min"] - 273.15;
            let newHighTemp = data["main"]["temp_max"] - 273.15;

            setCurrentTemp(newCurrentTemp);
            setLowTemp(newLowTemp);
            setHighTemp(newHighTemp);
        }

        // Set weather icon
        setIcon(data["weather"][0]["icon"]);

        // Set weather description
        setIconDesc(data["weather"][0]["main"]);

        // Set wind speed
        setWindSpeed(Math.floor(data["wind"]["speed"]));

        // Set humidity
        setHumidity(data["main"]["humidity"]);

        // clear input textbox
        document.getElementById("inputCity").value = "";
    };

    // Initialize screen with data
    const initialize = () => {
        setLoading(true);

        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Cupertino&limit=5&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if(data.length === 0){
                alert('ERROR: Something went wrong.');
            }
            else{
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0]['lat']}&lon=${data[0]['lon']}&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    if(data.length === 0){
                        alert('ERROR: Something went wrong.');
                    }
                    else{
                        updateScreen(data);
                    }
                })
                .then(() => setLoading(false))
                .catch(err => console.log(`error ${err}`));
            }
        })
        .catch(err => console.log(`error ${err}`));
    }

    // Fetch weather data from API
    const getWeatherInfo = (cityInfo) => {
        setLoading(true);

        if(!cityInfo['lat'] || !cityInfo['lon']){
            let inputCity = document.getElementById("inputCity").value;

            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=5&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                if(data.length === 0){
                    alert('ERROR: Something went wrong.');
                }
                else{
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0]['lat']}&lon=${data[0]['lon']}&appid=${API_KEY}`)
                    .then(response => response.json())
                    .then(data => {
                        if(data.length === 0){
                            alert('ERROR: Something went wrong.');
                        }
                        else{
                            updateScreen(data);
                        }
                    })
                    .then(() => setLoading(false))
                    .catch(err => console.log(`error ${err}`));
                }
            })
            .catch(err => console.log(`error ${err}`));
        }
        else{
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityInfo['lat']}&lon=${cityInfo['lon']}&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                if(data.length === 0){
                    alert('ERROR: Something went wrong.');
                }
                else{
                    updateScreen(data);
                }
            })
            .then(() => setLoading(false))
            .catch(err => console.log(`error ${err}`));
        }
    };

    useEffect(() => {
        initialize();
    }, []);

    return loading ? (
        <div className="container">
            <p className="appHeading">React Weather App</p>
            <select className="settingMenu" onChange={convert}>
                <option value='' disabled>Temp Setting</option>
                <option value='C'>&deg;C</option>
                <option value='F'>&deg;F</option>
            </select>
            <div className="searchSection">
                <input id="inputCity" type="text" placeholder="Search a city"/>
                <div className="searchBtn" onClick={() => getWeatherInfo("")}>
                    <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
                </div>
            </div>
            <div className="loadingSection">
                <p>Loading...</p>
            </div>
            <div className="extraInfo">
                <div className="windSpeed">
                    <p className="windSpeedHeading">Wind Speed</p>
                    <p className="windSpeedVal">...</p>
                    <p>mph</p>
                </div>
                <div className="humidity">
                    <p className="humidityHeading">Humidity</p>
                    <p className="humidityVal">...</p>
                </div>
            </div>
        </div>
    ) : (
        <div className="container">
            <p className="appHeading">React Weather App</p>
            <select className="settingMenu" onChange={convert}>
                <option value='' disabled>Temp Setting</option>
                <option value='C'>&deg;C</option>
                <option value='F'>&deg;F</option>
            </select>
            <div className="searchSection">
                <input id="inputCity" type="text" placeholder="Search a city" onInput={showResults} onBlur={hideResults}/>
                <div id="searchResultSection" className="searchResultSection">

                </div>
                <div className="searchBtn" onClick={getWeatherInfo}>
                    <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
                </div>
            </div>
            <p className="cityName">{city}</p>
            <p className="currentTemp">{Math.round(currentTemp)}&deg;{tempSetting}</p>
            <div className="lowhighHeading">
                <p>Low</p>
                <p>High</p>
            </div>
            <div className="lowhighTemps">
                <p>{Math.round(lowTemp)}&deg;{tempSetting}</p>
                <p>/</p>
                <p>{Math.round(highTemp)}&deg;{tempSetting}</p>
            </div>
            <div className="weatherIconSpace">
                <img className="weatherIcon" src={`http://openweathermap.org/img/w/${icon}.png`} alt="Sunny Icon" />
                <p className="weatherIconDesc">{iconDesc}</p>
            </div>
            <div className="extraInfo">
                <div className="windSpeed">
                    <p className="windSpeedHeading">Wind Speed</p>
                    <p className="windSpeedVal">{windSpeed}</p>
                    <p>mph</p>
                </div>
                <div className="humidity">
                    <p className="humidityHeading">Humidity</p>
                    <p className="humidityVal">{humidity}&#37;</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
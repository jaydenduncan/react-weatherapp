import React, { useState, useEffect } from "react";
import './WeatherApp.css';

import Settings from "./Settings";
import SearchBar from "./SearchBar";
import MainInfo from "./MainInfo";
import SideInfo from "./SideInfo";

import SUNNY from './images/day/sunny.png';
import DAY_PARTLY_CLOUDY from './images/day/partly_cloudy.png';
import DAY_CLOUDY from './images/day/cloudy.png';
import DAY_BROKEN_CLOUDS from './images/day/broken_clouds.png';
import DAY_SHOWER_RAIN from './images/day/shower_rain.png';
import DAY_RAIN from './images/day/rain.png';
import DAY_TSTORM from './images/day/stormy.png';
import DAY_SNOW from './images/day/snowy.png';
import DAY_MIST from './images/day/mist.png';

import NIGHT_CLEAR from './images/night/clear_night.png';
import NIGHT_PARTLY_CLOUDY from './images/night/partly_cloudy.png';
import NIGHT_CLOUDY from './images/night/cloudy.png';
import NIGHT_BROKEN_CLOUDS from './images/night/broken_clouds.png';
import NIGHT_SHOWER_RAIN from './images/night/shower_rain.png';
import NIGHT_RAIN from './images/night/rain.png';
import NIGHT_TSTORM from './images/night/stormy.png';
import NIGHT_SNOW from './images/night/snowy.png';
import NIGHT_MIST from './images/night/mist.png';

function WeatherApp() {
    const Scale = {
        FAHRENHEIT: 'F',
        CELSIUS: 'C'
    };

    const DAY_ICON = {
        "01d": SUNNY,
        "02d": DAY_PARTLY_CLOUDY,
        "03d": DAY_CLOUDY,
        "04d": DAY_BROKEN_CLOUDS,
        "09d": DAY_SHOWER_RAIN,
        "10d": DAY_RAIN,
        "11d": DAY_TSTORM,
        "13d": DAY_SNOW,
        "50d": DAY_MIST
    };

    const NIGHT_ICON = {
        "01n": NIGHT_CLEAR,
        "02n": NIGHT_PARTLY_CLOUDY,
        "03n": NIGHT_CLOUDY,
        "04n": NIGHT_BROKEN_CLOUDS,
        "09n": NIGHT_SHOWER_RAIN,
        "10n": NIGHT_RAIN,
        "11n": NIGHT_TSTORM,
        "13n": NIGHT_SNOW,
        "50n": NIGHT_MIST
    };

    const [city, setCity] = useState("");
    const [currentTemp, setCurrentTemp] = useState(0);
    const [lowTemp, setLowTemp] = useState(0);
    const [highTemp, setHighTemp] = useState(0);
    const [icon, setIcon] = useState(DAY_ICON["01d"]);
    const [iconDesc, setIconDesc] = useState("sunny");
    const [windSpeed, setWindSpeed] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [tempSetting, setTempSetting] = useState(Scale.CELSIUS);
    const [loading, setLoading] = useState(false);

    // Store API key
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

            if(cityInput)
                fetchData();
            else
                hideResults();
        }
        else{
            var searchResultsDiv = document.getElementById("searchResults");

            if(cityInput)
                fetchData();
            else
                hideResults();
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
        let icon_code = data["weather"][0]["icon"];
        if(icon_code[icon_code.length-1] === "d"){
            setIcon(DAY_ICON[icon_code]);
        }
        else if(icon_code[icon_code.length-1] === "n"){
            setIcon(NIGHT_ICON[icon_code]);
        }

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

            if(inputCity){
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
                alert("ERROR: Enter a city.");
                setLoading(false);
            }
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
            <Settings />
            <SearchBar getWeatherInfo={getWeatherInfo}/>
            <div className="loadingSection">
                <p>Loading...</p>
            </div>
            <SideInfo loading={true} />
        </div>
    ) : (
        <div className="container">
            <Settings convert={convert} />
            <SearchBar getWeatherInfo={getWeatherInfo} showResults={showResults} hideResults={hideResults} />
            <MainInfo city={city} currentTemp={currentTemp} tempSetting={tempSetting} 
                        lowTemp={lowTemp} highTemp={highTemp} icon={icon} iconDesc={iconDesc} />
            <SideInfo windSpeed={windSpeed} humidity={humidity} loading={false} />
        </div>
    );
}

export default WeatherApp;
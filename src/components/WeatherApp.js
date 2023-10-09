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

function WeatherApp() {
    const Weather = {
        CLEAR: "Clear",
        CLOUDY: "Cloudy",
        LIGHTNING: "Lightning",
        PARTLY_CLOUDY: "Partly Cloudy",
        RAINY: "Rain",
        SNOWY: "Snow",
        STORMY: "Storm",
        SUNNY: "Sunny"
    };

    const Scale = {
        FAHRENHEIT: 'F',
        CELSIUS: 'C'
    };

    const [city, setCity] = useState("");
    const [currentTemp, setCurrentTemp] = useState(0);
    const [lowTemp, setLowTemp] = useState(0);
    const [highTemp, setHighTemp] = useState(0);
    const [icon, setIcon] = useState(sunny_icon);
    const [iconDesc, setIconDesc] = useState(Weather.SUNNY);
    const [windSpeed, setWindSpeed] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [tempSetting, setTempSetting] = useState(Scale.CELSIUS);
    const [loading, setLoading] = useState(false);

    // Define API settings
    let options = {
        method: 'GET',
        headers: {'x-api-key':process.env.REACT_APP_API_KEY}
    };

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

    // Update screen to match new data
    const updateScreen = (data, inputCity) => {
        setCity(inputCity);

        if(tempSetting == Scale.FAHRENHEIT){
            let newCurrentTemp = ((data["temp"] * 9) / 5) + 32;
            let newLowTemp = ((data["min_temp"] * 9) / 5) + 32;
            let newHighTemp = ((data["max_temp"] * 9) / 5) + 32;

            setCurrentTemp(newCurrentTemp);
            setLowTemp(newLowTemp);
            setHighTemp(newHighTemp);
        }
        else{
            setCurrentTemp(data["temp"]);
            setLowTemp(data["min_temp"]);
            setHighTemp(data["max_temp"]);
        }

        setWindSpeed(Math.floor(data["wind_speed"]));
        setHumidity(data["humidity"]);

        document.getElementById("inputCity").value = ""; // clear input textbox
    };

    // Initialize screen with data
    const initialize = () => {
        setLoading(true);

        fetch('https://api.api-ninjas.com/v1/weather?city=London', options)
        .then(response => response.json())
        .then(data => {
            if(data["error"]){
                alert('ERROR: Something went wrong');
            }
            else{
                updateScreen(data, 'London');
            }
        })
        .then(() => setLoading(false))
        .catch(err => console.log(`error ${err}`));
    };

    // Fetch weather data from API
    const getWeatherInfo = () => {
        setLoading(true);

        let inputCity = document.getElementById("inputCity").value;

        fetch(`https://api.api-ninjas.com/v1/weather?city=${inputCity}`, options)
        .then(response => response.json())
        .then(data => {
            if(data["error"]){
                alert('ERROR: Please enter a valid city.');
            }
            else{
                updateScreen(data, inputCity);
            }
        })
        .then(() => setLoading(false))
        .catch(err => console.log(`error ${err}`));
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
                <div className="searchBtn" onClick={getWeatherInfo}>
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
                <input id="inputCity" type="text" placeholder="Search a city"/>
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
                <img className="weatherIcon" src={icon} alt="Sunny Icon" />
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
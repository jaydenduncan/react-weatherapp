import React from "react";
import "./css/SideInfo.css";

function SideInfo({sideInfo, loading}){
    return loading ? (
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
    ) : (
        <div className="extraInfo">
            {/*}
            <div className="pressure">
                <p className="pressureHeading">Pressure</p>
                <p className="pressureVal">{sideInfo.pressure}hPa</p>
            </div>
            <div className="humidity">
                <p className="humidityHeading">Humidity</p>
                <p className="humidityVal">{sideInfo.humidity}&#37;</p>
            </div>
            <div className="windSpeed">
                <p className="windSpeedHeading">Wind Speed</p>
                <p className="windSpeedVal">{sideInfo.windSpeed}</p>
                <p>mph</p>
            </div>
            <div className="windDegree">
                <p className="windDegreeHeading">Wind Degree</p>
                <p className="windDegreeVal">{sideInfo.windDeg}</p>
            </div>
            <div className="windGust">
                <p className="windGustHeading">Wind Gust</p>
                <p className="windGustVal">{sideInfo.windGust}</p>
            </div>
            {*/}
            <div className="sunrise">
                <p className="sunriseHeading">Sunrise</p>
                <p className="sunriseVal">{sideInfo.sunrise.hours}:{sideInfo.sunrise.minutes}{sideInfo.sunrise.ampm}</p>
            </div>
            <div className="sunset">
                <p className="sunsetHeading">Sunset</p>
                <p className="sunsetVal">{sideInfo.sunset.hours}:{sideInfo.sunset.minutes}{sideInfo.sunset.ampm}</p>
            </div>
        </div>
    );
}

export default SideInfo;
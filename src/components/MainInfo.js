import React from "react";
import "./css/MainInfo.css";

function MainInfo({mainInfo, loading}){
    return loading ? (
        <div id="mainInfoSection" className="mainInfoSection">
            <div className="weatherInfoSpace">
                <p className="cityName">...</p>
                <p className="currentTemp">...</p>
                <p className="realFeelTemp">...</p>
                <div className="lowhighTemps">
                    <p>...</p>
                </div>
            </div>
            <div className="weatherIconSpace">
                <p className="weatherIconDesc">...</p>
            </div>
        </div> 
    ) : (
        <div id="mainInfoSection" className="mainInfoSection">
            <div className="weatherInfoSpace">
                <p className="cityName">{mainInfo.city}, {mainInfo.country}</p>
                <p className="currentTemp">{Math.round(mainInfo.currentTemp)}&deg;{mainInfo.tempSetting}</p>
                <p className="realFeelTemp">Feels like {Math.round(mainInfo.feelsLike)}&deg;{mainInfo.tempSetting}</p>
                <div className="lowhighTemps">
                    <p>{Math.round(mainInfo.lowTemp)}&deg;{mainInfo.tempSetting} / {Math.round(mainInfo.highTemp)}&deg;{mainInfo.tempSetting}</p>
                </div>
            </div>
            <div className="weatherIconSpace">
                <img className="weatherIcon" src={mainInfo.icon} alt="Weather Icon" />
                <p className="weatherIconDesc">{mainInfo.iconDesc}</p>
            </div>
        </div> 
    );
}

export default MainInfo;
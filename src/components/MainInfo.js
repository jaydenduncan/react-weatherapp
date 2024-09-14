import React from "react";
import "./css/MainInfo.css";

function MainInfo({mainInfo}){
    return (
        <div className="mainInfoSection">
            <p className="cityName">{mainInfo.city}, {mainInfo.country}</p>
            <p className="currentTemp">{Math.round(mainInfo.currentTemp)}&deg;{mainInfo.tempSetting}</p>
            <div className="lowhighHeading">
                <p>Low</p>
                <p>High</p>
            </div>
            <div className="lowhighTemps">
                <p>{Math.round(mainInfo.lowTemp)}&deg;{mainInfo.tempSetting}</p>
                <p>/</p>
                <p>{Math.round(mainInfo.highTemp)}&deg;{mainInfo.tempSetting}</p>
            </div>
            <div className="weatherIconSpace">
                <img className="weatherIcon" src={mainInfo.icon} alt="Weather Icon" />
                <p className="weatherIconDesc">{mainInfo.iconDesc}</p>
            </div>
        </div>
    );
}

export default MainInfo;
import React from "react";

function MainInfo({city, currentTemp, tempSetting, lowTemp, highTemp, icon, iconDesc}){
    return (
        <>
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
                <img className="weatherIcon" src={icon} alt="Weather Icon" />
                <p className="weatherIconDesc">{iconDesc}</p>
            </div>
        </>
    );
}

export default MainInfo;
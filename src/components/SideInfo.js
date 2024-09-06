import React from "react";

function SideInfo({windSpeed, humidity, loading}){
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
    );
}

export default SideInfo;
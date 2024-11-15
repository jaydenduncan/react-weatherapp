import React from "react";
import "./css/Settings.css";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Settings({convert}){
    return (
        <div id="settingsSection" className="settingsSection">
            <p id="celsiusSetting" onClick={convert}><FontAwesomeIcon className="check" icon={faCheck} />Celsius</p>
            <hr />
            <p id="fahrenheitSetting" onClick={convert}><FontAwesomeIcon className="check" icon={faCheck} />Fahrenheit</p>
        </div>
    );
}

export default Settings;
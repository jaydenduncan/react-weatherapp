import React from "react";

function Settings({convert}){
    return (
        <select className="settingMenu" onChange={convert}>
            <option value='' disabled>Temp Setting</option>
            <option value='C'>&deg;C</option>
            <option value='F'>&deg;F</option>
        </select>
    );
}

export default Settings;
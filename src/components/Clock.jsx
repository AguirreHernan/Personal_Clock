import React from "react";
import TimeInput from "./timer/TimerInput";

export default function Clock({_id, }){
    return(
        <div className="clock-container" id={_id}>
            <div className="clock-numbers">
            </div>
            <div className="clock-btns">
            </div>
        </div>
    )
}
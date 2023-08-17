import React, { useState } from "react";
import goback from '../../assets/images/goback.svg';

import TimeInput from "./TimerInput";


export default function TimerVersionCreator ({createNewVersion}){
    let [sec, setSec] = useState('00');
    let [min, setMin] = useState('00');
    let [hr, setHr] = useState('00');

    function manageMessage(comp, msg, color){
        comp.textContent = msg;
        comp.style.opacity = '1';
        comp.style.color = color;
        setTimeout(()=>{
            comp.style.opacity = '0';
        }, 2000)
    }

    function clearInput(){
        document.getElementById('description-input').value = '';
        setSec('00');
        setMin('00');
        setHr('00');
    }

    return(
        <div id="version-creator-container">
            <div id="version-creator">
                <div id="description-top-side">
                    <figure id="back-to-versions"
                    onClick={()=>{
                        document.getElementById('version-creator-container').style.opacity = '0';
                        setTimeout(() => {
                            document.getElementById('version-creator-container').style.display = 'none';
                        }, 250);
                        clearInput();
                    }}
                    > 
                        <img src={goback}></img>
                    </figure>
                    <h3>Description:</h3>
                    <input type="text" id="description-input" placeholder="Write a description" maxLength={'55'}></input>
                </div>

                <div>
                    <TimeInput
                    max={99}
                    timeUnit={hr}
                    setTimeUnit={setHr}
                    readOnly={false}
                    ></TimeInput>

                    <TimeInput
                    max={60}
                    timeUnit={min}
                    setTimeUnit={setMin}
                    readOnly={false}
                    ></TimeInput>

                    <TimeInput
                    max={60}
                    timeUnit={sec}
                    setTimeUnit={setSec}
                    readOnly={false}
                    ></TimeInput>
                </div>

                <p id="operation-state">placeholder text</p>

                <button id="submit-time"
                onClick={()=>{
                    const state = document.getElementById('operation-state');
                    let description = document.getElementById('description-input').value;
                    if(description == ''){
                        manageMessage(state, 'No description give, please fullfill', '#f06094');
                        return;
                    }
                    if(hr == '00' && min  == '00' && sec == '00' ){
                        manageMessage(state, 'fullfill the time inputs', '#f06094');
                        return;
                    }
                    manageMessage(state, 'Succesfully saved', '#60f0a4');


                    createNewVersion(description, hr, min, sec);
                    clearInput();
                }}
                >Save</button>
            </div>
        </div>
    )
}
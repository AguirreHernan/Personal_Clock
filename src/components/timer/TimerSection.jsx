import React from "react";
import { useEffect, useState } from "react";

import Timer from "./Timer";
import TimerVersionCreator from "./TimerVersionCreator";
import './Timer.css';

import deleteIcon from '../../assets/images/delete.png';

const getId = (x)=>{
    return document.getElementById(x);
}

function TimerVersion({description, hr, min, sec, func, idx, dlt}){
    return(
        <div className="timer-version">
            <div className="top-side">
                <h3 className="timer-description">{description}</h3>
                <figure className="delete-btn"
                onClick={()=>{
                    dlt(idx);
                }}
                >
                    <img src={deleteIcon}></img>
                </figure>
            </div>

            <div className="bottom-side">
                <div className="version-of-time">
                    <p className="hour-version">{hr}</p>
                    <p className="min-version">{min}</p>
                    <p className="sec-version">{sec}</p>
                </div>

                <button
                onClick={()=>{
                    let timerContainer = getId('timer-container');
                    timerContainer.style.display = 'flex';
                    timerContainer.style.flexDirection = 'column';
                    timerContainer.style.justifyContent = 'center';
                    timerContainer.style.alignItems = 'center';
                    timerContainer.style.height = '88vh';
                    timerContainer.style.width = '100%';

                    getId('timer-versions-container').style.display = 'none';
                    func(hr, min, sec);
                 }}
                className="start-timer-version"
                >Start</button>
            </div>
        </div>
    )
}

export default function TimerSection(){
    let [timeVersions, setTimeVersions] = useState(
        JSON.parse(localStorage.getItem('versions')) || []
    );
    let [listTime, setListTime] = useState([]);
    let [arr, setArr] = useState(['00', '00', '00']);

    function passTimeInfo(h,m,s){
        setArr([h, m, s]);
    }
    function deleteVersion(idx){
        if(idx > -1){
            let versions = JSON.parse(localStorage.getItem('versions'));
            versions.splice(idx, 1);
            setTimeVersions(versions);
        }
    }

    
    useEffect(()=>{
        setListTime(
            timeVersions.map((version, idx)=>{
                return <TimerVersion 
                description={version.description}
                hr={version.hr} 
                min={version.min} 
                sec={version.sec} 
                func={passTimeInfo}
                key={idx}
                idx={idx}
                dlt={deleteVersion}
                ></TimerVersion> ;
            })
        )

        if( timeVersions.length < 11){
            localStorage.setItem('versions', JSON.stringify(timeVersions));
        }

    }, [timeVersions]);


    function createNewVersion(description, hr, min, sec){
        try{
            setTimeVersions([
                ...timeVersions,
                {
                    description: description,
                    hr: hr,
                    min: min,
                    sec: sec,
                }
            ])
        }catch(e){
            console.error(e)
        }
        
    }
    
    return(
        <div id="timer-section">
            <div id="timer-versions-container">
                <button 
                id="add-new-btn"
                onClick={()=>{
                    document.getElementById('version-creator-container').style.opacity = '1';
                    document.getElementById('version-creator-container').style.display = 'flex';
                }}
                >+</button>

                <div id="all-time-versions">
                    {listTime}
                </div>

            </div>
            
            <TimerVersionCreator createNewVersion={createNewVersion}></TimerVersionCreator>
            <Timer time={arr}></Timer>
        </div>
    )
}
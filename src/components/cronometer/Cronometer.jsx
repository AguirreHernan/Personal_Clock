import React, { useEffect, useRef, useState } from "react";

import TimeInput from "../timer/TimerInput";
import './cronometer.css';

function Mark({markNum, time, total}){
    return(
        <tr className="mark">
            <td className="mark-number">{markNum}</td>
            <td className="time">{time}</td>
            <td className="total-time">{total}</td>
        </tr>
    );
}

export default function Cronometer(){
    let [hour, setHour] = useState('00');
    let [minute, setMinute] = useState('00');
    let [second, setSecond] = useState('00');
    let [markIdx, setMarkIdx] = useState('1');

    let [lastMark, setLastMark] = useState('00:00:00');
    let [listMarks, setListMarks] = useState([]);
    let [isRunning, setIsRunning] = useState(false);

    const startCroRef = useRef(null);
    const stopCroRef = useRef(null);

    let updateTime = (timeUnit)=>{
        if(parseInt(timeUnit) < 9) timeUnit = '0' + (parseInt(timeUnit) + 1).toString();
        else timeUnit = (parseInt(timeUnit) + 1).toString();
        return timeUnit;
      }


    useEffect(()=>{

        if(!isRunning) return;
        let cronometer = setInterval(()=>{
            setSecond(updateTime);

            if(second == "59"){
                setSecond('00');
                setMinute(updateTime);

                if(minute == "59"){
                    setSecond("00");
                    setMinute("00");
                    setHour(updateTime);
                }
            }
        }, 1000)

        return () => clearInterval(cronometer);
    }, [isRunning, second, minute, hour]);

    return(
        <div id="cronometer-container">
            <div id="cronometer">
                <div id="cronometer-time">
                    <TimeInput
                    max={99}
                    timeUnit={hour}
                    setTimeUnit={setHour}  
                    readOnly={true}
                    ></TimeInput>

                    <TimeInput
                    max={60}
                    timeUnit={minute}
                    setTimeUnit={setMinute}  
                    readOnly={true}
                    ></TimeInput>

                    <TimeInput
                    max={60}
                    timeUnit={second}
                    setTimeUnit={setSecond}  
                    readOnly={true}
                    ></TimeInput>
                </div>
                <div id="cronometer-btns">
                    <button 
                    ref={startCroRef}
                    className="cro-btn"
                    onClick={()=>{
                        stopCroRef.current.style.display = 'inline';
                        startCroRef.current.style.display = 'none';
                        setIsRunning(true);
                    }}
                    >Start</button>

                    <button 
                    ref={stopCroRef}
                    className="cro-btn"
                    onClick={()=>{
                        startCroRef.current.style.display = 'inline';
                        stopCroRef.current.style.display = 'none';
                        setIsRunning(false);
                    }}
                    >Stop</button>

                    <button 
                    className="cro-btn"
                    onClick={()=>{
                        if(hour == '00' && minute == '00' && second == '00') return;

                        setListMarks(prevMark => {
                            return prevMark.concat(
                                <Mark
                                    key={markIdx}
                                    markNum={markIdx}
                                    time={'00:00:00'}
                                    total={`${hour}:${minute}:${second}`}
                                ></Mark>
                            );
                        });
                        setMarkIdx((parseInt(markIdx) + 1).toString());
                        
                    }}
                    >Mark</button>
                    
                    <button 
                    className="cro-btn"
                    onClick={()=>{
                        setHour('00');
                        setMinute('00');
                        setSecond('00');
                        setIsRunning(false);
                        startCroRef.current.style.display = 'inline';
                        stopCroRef.current.style.display = 'none';
                    }}
                    >Reset</button>
                </div>
            </div>

            <table id="marks-container">
                <thead id="marks-titles">
                    <tr>
                        <th>Mark</th>
                        <th>Time</th>
                        <th>Total Time</th>
                    </tr>
                </thead>
                <tbody>
                    {listMarks}
                </tbody>
            </table>

        </div>
    )
}
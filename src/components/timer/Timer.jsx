import React from "react";
import { useEffect, useState } from "react";

import TimeInput from "./TimerInput";

import goback from '../../assets/images/goback.svg';

export default function Timer({time}){
    let [hour, setHour] = useState(time[0]);
    let [minute, setMinute] = useState(time[1]);
    let [second, setSecond] = useState(time[2]);
    let [timeRunning, setTimeRunning] = useState(false);
    let [timeInPlace, setTimeInPlace] = useState(false);

    let refreshTime = (timeUnit)=>{
      if(parseInt(timeUnit) <= 10) timeUnit = '0' + (parseInt(timeUnit) - 1).toString();
      else timeUnit = (parseInt(timeUnit) - 1).toString();
      return timeUnit;
    }

    useEffect(()=>{

      if(timeInPlace == false){
        setHour(time[0]);
        setMinute(time[1]);
        setSecond(time[2]);
        return;
      }

      if(!timeRunning) return;

      if(hour == '00' && minute == '00' && second == '00'){
        setTimeRunning(false);
        return;
      }

      let timer = setInterval(()=>{
        if(second != '00'){
          setSecond(refreshTime);
          return;
        }
        if(minute != '00' && second == '00'){
          setMinute(refreshTime);
          setSecond('59');
          return;
        }
        if(hour != '00' && minute == '00' && second == '00'){
          setHour(refreshTime);
          setMinute('59');
          setSecond('59');
        }
      }, 1000);

      return ()=> clearInterval(timer);
    }, [hour, minute, second, timeRunning, timeInPlace, time]);
    
    return(
      <div id='timer-container'>
        <div id="timer-top">
          <figure id="goback-btn"
            onClick={()=>{
              setTimeInPlace(false);
              setTimeRunning(false);
              document.getElementById('timer-container').style.display = 'none';
              document.getElementById('timer-versions-container').style.display = 'flex';

              document.getElementById('start-btn').style.display = 'inline';
              document.getElementById('stop-btn').style.display = 'none';
            }}
          >
            <img src={goback}></img>
          </figure>
        </div>
  
        <div id='timer'>

          <TimeInput
          max={99}
          timeUnit={hour}
          setTimeUnit={setHour}
          setTimeInPlace={setTimeInPlace}
          readOnly={timeRunning}
          ></TimeInput>
          <p>:</p>
          <TimeInput
          max={59}
          timeUnit={minute}
          setTimeUnit={setMinute}  
          setTimeInPlace={setTimeInPlace}
          readOnly={timeRunning}
          ></TimeInput>
          <p>:</p>
          <TimeInput
          max={59}
          timeUnit={second}
          setTimeUnit={setSecond}  
          setTimeInPlace={setTimeInPlace}
          readOnly={timeRunning}
          ></TimeInput>
          
        </div>
  
        <div id='timer-buttons'>
  
          <button 
          id="start-btn"
          className='timer-buttons'
          onClick={() => {
            setTimeInPlace(true);
            setTimeRunning(true);
            if(hour == '00' && minute == '00' && second == '00') return;
            document.getElementById('stop-btn').style.display = 'inline';
            document.getElementById('start-btn').style.display = 'none';
          }}
          >Start</button>

          <button 
          id="stop-btn"
          className='timer-buttons'
          onClick={() => {
            setTimeRunning(false);
            document.getElementById('start-btn').style.display = 'inline';
            document.getElementById('stop-btn').style.display = 'none';
          }}
          >Stop</button>
  
          <button 
          className='timer-buttons'
          onClick={()=>{
            setTimeInPlace(true);
            setTimeRunning(false);
            document.getElementById('start-btn').style.display = 'inline';
            document.getElementById('stop-btn').style.display = 'none';
            setHour('00');
            setMinute('00');
            setSecond('00');
          }}
          >Clear</button>
  
        </div>
  
      </div>
    )
  }  
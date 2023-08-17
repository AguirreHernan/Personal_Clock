import React from "react";

export default function TimeInput({max, timeUnit, setTimeUnit, setTimeInPlace, readOnly}){

    function handleTIme(e){
      let value = e.target.value;
      if (value.length > 2)return;
  
      if(parseInt(value) > max) value = max.toString();
      setTimeUnit(value);
    }
  
    return(
      <input 
      type='number' 
      className='timer-number' 
      min={0} 
      max={max} 
      value={timeUnit}  
      onChange={(e) => handleTIme(e)}
      onClick={()=>{
        if(!readOnly){
          setTimeUnit('');
          if(typeof setTimeInPlace === 'function') setTimeInPlace(true);
        }
      }}
      onBlur={()=> {
        if(timeUnit.length == 1) setTimeUnit('0' + timeUnit);
        if(timeUnit.length == 0) setTimeUnit('00');
      }}
      readOnly={readOnly}
      ></input>
    );
}
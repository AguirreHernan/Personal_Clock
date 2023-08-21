import React, { useState } from 'react'

import TimerSection from './components/timer/TimerSection';
import Cronometer from './components/cronometer/cronometer';
import './App.css'


import logo from './assets/images/clock.svg';


function OptionBtn({source, feature, click}){
  return(
    <li id='option' onClick={click}>
      <figure>
        <img src={source}></img>
      </figure>
      <p>{feature}</p>
    </li>
  )
}


function App() {
  let [renderTimer, setRenderTimer] = useState(true);

  return (
    <div id='app'>

      <header>
        <h1>Personal Clock</h1>
      </header>

      <div id='content'>

        <aside>
          <ul>
            <OptionBtn 
            source={logo}
            feature={'Timer'}
            click={()=>{
              setRenderTimer(true);
            }}
            ></OptionBtn>
            <OptionBtn source={logo} feature={'Cronometer'}
            click={()=>{
              setRenderTimer(false)
            }}
            ></OptionBtn>
          </ul>
        </aside>

        <main>
          {renderTimer ? <TimerSection></TimerSection>
                       : <Cronometer></Cronometer>}
        </main>

      </div>
    </div>
  )
}

export default App

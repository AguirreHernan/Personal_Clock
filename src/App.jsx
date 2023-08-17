import React from 'react'

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
              document.getElementById('timer-section').style.display = 'flex';
              document.getElementById('version-creator-container').style.width = '80vw';
              document.getElementById('cronometer-container').style.display = 'none';
            }}
            ></OptionBtn>
            <OptionBtn source={logo} feature={'Cronometer'}
            click={()=>{
              document.getElementById('cronometer-container').style.display = 'flex';
              document.getElementById('cronometer-container').style.height = '88vh';
              document.getElementById('cronometer-container').style.width = '80vw';
              document.getElementById('timer-section').style.display = 'none';
            }}
            ></OptionBtn>
          </ul>
        </aside>

        <main>
          <TimerSection></TimerSection>
          <Cronometer></Cronometer>
        </main>

      </div>
    </div>
  )
}

export default App

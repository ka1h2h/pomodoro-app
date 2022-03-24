import React, {useState, useEffect} from "react";
import './Tomodoro.css'
import PlusIcon from './PlusIcon.svg';
import Minus from './Minus.svg'
import useSound from "use-sound";
import alarm from './alarm.mp3'

const Tomodoro = (props) => {
    const {initialMinute = 0,initialSeconds = 1} = props
    const [minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds)
    const [timer, setTimer] = useState(5)
    const [pause, setPause] = useState(true)
    const [isChecked, setIsChecked] = useState(false)
    const [play, {stop}] = useSound(
        alarm, {volume: 0.25}
    )

    useEffect(() => {
        let myInterval = setInterval(() => {
                if (!pause) {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }}
                if (!pause) {
                if (seconds === 0) {
                if (minutes > 0) {
                    setMinutes(minutes - 1)
                    setSeconds(59)
                    }}}
                if (minutes === 0) {
                if (seconds === 0) {
                    setIsChecked(play)
                  }}
                    }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
        });

        const handlePauseToggle = () => {
            setPause(!pause)
          }
        
        const handleResetToggle = () => {
                if (pause) {
                setPause(pause)
                setMinutes(timer)
                setSeconds(0)
                setIsChecked(stop)
              } else { 
                setPause(!pause)
                setMinutes(timer)
                setSeconds(0)
                setIsChecked(stop)
              }}
        
    return (

        <div>
        <span className='counter'>{minutes === 0 && seconds === 0 ? null : <h2> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h2>}</span>
        <button className='btnStart' onClick={handlePauseToggle}>Start</button>
        <button className='btnReset' onClick={handleResetToggle}>Reset</button>
        <div className='footer'>
          <p>Session Lenght</p>
          <button className='btnAddTime' onClick={() => setTimer(prev => prev + 5)}>
          <img src={PlusIcon}/>
          <span className='min'>{timer} min</span>
          </button>
          <button className='btnRemoveTime' onClick={() => setTimer(prev => prev - 5)}>
          <img src={Minus}/>
          </button>
          </div>
        </div>
   
    )   
}

export default Tomodoro
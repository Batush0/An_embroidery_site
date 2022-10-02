import React from 'react'
import './style.css'
export const NotificationPopUp = ({script,onAction}) => {

    React.useEffect(()=>{
        const popUp = document.getElementById('popUp');
        popUp.classList.toggle('onAction',onAction)
    },[onAction])

  return (
    <div id='popUp'>
        <div id='popUpContent'>
            <h2 className='popUpScript'>
                {script}
            </h2>
        </div>
    </div>
  )
}

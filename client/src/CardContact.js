import React from 'react'
import './Styles/Contact.css'

import gmail from './Assets/gmail.png'
import maps from './Assets/maps.png'


const CardContact = () => {


    const Card = (props) => {
        return (
        <div id='contact-card'>
            <a href={props.url} target="_blank"> 
                <img id='contact-card__image' src={props.image}/>
             </a>
        </div>
        )
    }

  return (
    <div id='contact-body'>
        <Card image={gmail} url={'https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzCMldxXnBkVqBqSrDSGMTCdjDjPGGRCNwVRNlJrHMbKPfwVZqHwlwgqTnsZcBWtmMcqHQd'} />
        <Card image={maps}  url={'https://www.google.com/maps/place/Iceland/@64.7964514,-23.7383964,6z/data=!3m1!4b1!4m5!3m4!1s0x48d22b52a3eb6043:0x6f8a0434e5c1459a!8m2!3d64.9975764!4d-18.6055183'}/>
    </div>
  )
}

export default CardContact
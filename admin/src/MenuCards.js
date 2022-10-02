import React from 'react'
import './App.css';

const MenuCard = ({img,title,href,text,guide}) => {
    return(
      <div className='menu-card shiny' style={{backgroundImage:`url(http://drive.google.com/uc?export=view&id=${img})`,backgroundSize:'cover'}}>
        <div className='title-box'>
          <h2 className='title header'>{title}</h2>
        </div>  
        <div className='menu-card shadow'>
          <div className='title-box' onClick={()=>{guide(href)}} >
            <h2 className='title travel'>{text}</h2>
          </div>
        </div>
      </div>
    )
}

export default MenuCard
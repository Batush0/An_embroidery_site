import React from 'react'
import './style.css'

const Product = (props) => {

  const background = props.img.default ? props.img.content : props.img ? `url(http://drive.google.com/uc?export=view&id=${props.img})` : 'purple'

    return (
        <div className='container'>
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=DynaPuff&family=Pacifico&family=Rubik+Dirt&family=Silkscreen&display=swap');
              @import url('https://fonts.googleapis.com/css2?family=Play&display=swap');
          </style>
          <div id='product__image' style={{background:background,backgroundRepeat: 'no-repeat',backgroundSize:'cover'}}></div>
          <div className='product-box'><h1 className='product-name'>{props.title.default? props.title.content:props.title}</h1></div>
          <div className='product-line' />
          <h2 className='details header'>Özellikler</h2>
    
          <div id='overview'>
            <ul >
              <li>
              <h4 className='detail name'>Ebat  : </h4>
              <h4 className='detail name'>Renkler  : </h4>
              <h4 className='detail name'>Aplike  : </h4>
              <h4 className='detail name'>Boyut  : </h4>
              <h4 className='detail name'>Vuruş  : </h4>
              </li>
            </ul>
            <ul >
              <li>
              <h4 className='detail value'>{props.size.default ? '000x000' : props.size ? props.size : '000x000'}</h4>
              <h4 className='detail value'>&#123; {props.color} &#125;</h4>
              <h4 className='detail value'>{props.applique ? 'Mevcut':'Yok'}</h4>
              <h4 className='detail value'>{props.dimension?'3D':'2D'}</h4>
              <h4 className='detail value'>{props.hit.default ? '000' : props.hit ? props.hit : '000'}</h4>
              </li>
            </ul>
          </div>
          {props.about.has == true &&
            <div>
              <h2 className='details about-h'>Hakkında</h2>
              <p className='about'>{props.about.detail}</p>
            </div>
          }
        </div>
      )
}

export default Product
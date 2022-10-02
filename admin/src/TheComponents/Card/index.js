import React from 'react'
import './style.css'

const Card = (props) => {

    const background = props.img.default ? props.img.content : props.img ? `url(http://drive.google.com/uc?export=view&id=${props.img})` : 'purple'

    return(
        <div className='card' style={{background:background,backgroundSize:'cover'}} key={props.title}>
            <h6 className='dimension'>{props.dimension?'3D':'2D'}</h6>
            <div className='card-content'>
                <h2 className='title'>{props.title.default? props.title.content:props.title}</h2>

                <ul>
                    <li>
                        <h4 className='prop info'>Ebat :</h4>
                        <h4 className='card-value info'>{props.size.default ? '000x000' : props.size ? props.size : '000x000'}</h4>
                    </li>

                    <li>
                        <h4 className='prop info'>Vuruş :</h4>
                        <h4 className='card-value info'>{props.hit.default ? '000' : props.hit ? props.hit : '000'}</h4>
                    </li>

                    <li>
                        <h4 className='prop info'>Aplika :</h4>
                        <h4 className='card-value info'>{props.applique ? 'Var':'Yok'}</h4>
                    </li>
                </ul>

                <a className='button'>ZIYARET ET</a>
            </div>
        </div>
    )
}

export default Card
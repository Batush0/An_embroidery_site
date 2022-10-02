import React ,{useState,useEffect} from 'react'
import './styleProduct.css' 

function Product(props){

  const [data,setData] = useState(undefined)

  useEffect(()=>{
    fetch(`http://localhost:8180/product/get/${props.id}`).then(res=>res.json()).then(d=>setData(d))
  },[])


  return (
    <>
      {data !== undefined &&
        <div className='container'>
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=DynaPuff&family=Pacifico&family=Rubik+Dirt&family=Silkscreen&display=swap');
              @import url('https://fonts.googleapis.com/css2?family=Play&display=swap');
          </style>
          <div id='product__image' style={{background:`url(http://drive.google.com/uc?export=view&id=${props.img})`,backgroundRepeat: 'no-repeat',backgroundSize:'cover'}}></div>
          <div className='product-box'><h1 className='product-name'>{props.title}</h1></div>
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
              <h4 className='detail value'>{props.size}</h4>
              <h4 className='detail value'>&#123; {data.color} &#125;</h4>
              <h4 className='detail value'>{props.applique ? 'Mevcut':'Yok'}</h4>
              <h4 className='detail value'>{props.dimension?'3D':'2D'}</h4>
              <h4 className='detail value'>{props.hit}</h4>
              </li>
            </ul>
          </div>
          {data.about.has == true &&
            <div>
              <h2 className='details about-h'>Hakkında</h2>
              <p className='about'>{data.about.detail}</p>
            </div>
          }
        </div>
      }
    </>
  )
}

export default Product
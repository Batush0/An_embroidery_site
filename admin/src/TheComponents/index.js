import React,{useState,useEffect} from 'react'
import './style.css'

import Card from './Card'
import Product from './Product'
import { NotificationPopUp } from '../NotificationPopUp'

const TheComponent = ({data,process,backend,message}) => {
  const [onInputPanel,setOnInputPanel] = useState(false)
  const [inputChanged,setInputChanged] = useState(false)
  const [focus,setFocus] = useState(undefined)
  const [onAbout,setOnAbout] = useState(false)
  const [productClicked,setProductClicked] = useState(false)
  const [delteCounter,setDeleteCounter] = useState(0);

  const [card,setCard] = useState(data)

    
    const handleValueChange = (event) => {
      setCard(prew=>{
        return{
          ...prew,[event.target.name]: event.target.type === 'text' ? event.target.value : event.target.checked
        }
      })
      setInputChanged(prew=>!prew)
      setFocus(event.target.id)
      setOnAbout(false)
      // console.log(card)
    }
    
    const handleAboutChange = (event)=> {
      setCard(prew=>{
        return{
          ...prew,'about': {...prew.about,[event.target.name]:event.target.type === 'textarea' ? event.target.value : event.target.checked}
        }
      })
      setInputChanged(prew=>!prew)
      setOnAbout(false)
      setFocus(event.target.id)
      {event.target.type ==='textarea' && setOnAbout(true)}
    }

    
    useEffect(()=>{
      {focus && document.getElementById(focus).focus()}
    })
    
    useEffect(()=>{
      {onAbout && document.getElementById(focus).setSelectionRange(card.about.detail.length,card.about.detail.length)}
    },card.detail)


    const CardInputs =() => {
      return(
        <div>
          <div id='input-column'>
              <h2 className='input-header'>Özellikler</h2>
              <input id='value-img' value={card.img.default?undefined:card.img} onChange={handleValueChange} name='img' type='text' placeholder='Drive fotoğraf id&#39;si' className='input'></input>
              <input id='value-title' value={card.title.default?undefined:card.title} onChange={handleValueChange} name='title' type='text' placeholder='Ürün Adı' className='input-name input'></input>
              <hr className='straight-line'/>
              <input id='value-size' value={card.size.default?undefined:card.size} onChange={handleValueChange} name='size' type='text' placeholder='Ebat' className='input-size input'></input>
              <input id='value-hit' value={card.hit.default?undefined:card.hit} onChange={handleValueChange} name='hit' type='text' placeholder='Vuruş' className='input'></input>
              <input id='value-color' value={card.color} onChange={handleValueChange} name='color' type='text' placeholder='Renkler' className='input'></input>
              <div id='input-checkbox-box'>
                <label className='label-checkbox'>Aplike</label>
                <input checked={card.applique} onChange={handleValueChange} name='applique' className='input-applique input-check' type="checkbox" id='input-applique'/>
              </div>
              <div id='input-checkbox-box'>
                <label className='label-checkbox'>Boyut {true ? '(3D)' : '(2D)'}</label>
                <input checked={card.dimension} onChange={handleValueChange} name='dimension' className='input-dimension input-check' type="checkbox" id='input-dimension'/>
              </div>
              <hr className='straight-line'/>
              <div>
                <input id='input_has-detail' checked={card.about.has} onChange={handleAboutChange} name='has' type='checkbox' className='input-gonna-detail input-check'/>
                <label id='label-gonna-detail'>Açıklama ?</label>
              </div>
              {card.about.has == true && 
              <div>
                <textarea value={card.about.detail} onChange={handleAboutChange} name='detail' id='input-detail' placeholder='Açıklama metini buraya'></textarea>
              </div>
              }
          </div>
          <div id='input-column__after' onClick={()=>setOnInputPanel(prew=>!prew)}>Düzenle</div>
        </div>

      )
    }  
   
    useEffect(()=>{
        const theProduct = document.getElementById('product')
        theProduct.classList.toggle('clicked',productClicked)
        theProduct.classList.toggle('hasAbout',card.about.has)

        const theInputPanel = document.getElementById('input-column')
        theInputPanel.classList.toggle('clicked',onInputPanel)
        const theInputAfter = document.getElementById('input-column__after')
        theInputAfter.classList.toggle('clicked',onInputPanel)

    },[productClicked,onInputPanel,inputChanged,message])

    const redyToSave = () =>{
        if(!card.title || !card.color || !card.hit || !card.size || card.size.length < 3 || !card.img || card.default){
          message('Doldurumda eksikler var ..')
        }
        else{
          backend(card)
        }
    }

    const deleteSave = async()=>{
      if(delteCounter === 1){
        const asd = await fetch(`http://localhost:8180/product/${card.id}`,{
          method:'DELETE',
          headers:{
              "Content-Type":"application/json"
          }
        })
        await window.location.reload()
      }
      message('Silmek istediğine eminsen bir daha BAAAAAAAAAAAAASS')
      setDeleteCounter(prew=>prew+1)
    } 

  return (
    <div className='main'>

      <div id='product' onClick={()=>{setProductClicked(prew=>!prew)}}>
        <Product {...card}/>
      </div>

      <div id='card'>
        <Card {...card}/>
      </div>
        
      <CardInputs/>
      <div id='procces-buttons'>
        {process === 'Düzenle' &&
          <div className='procces-button' onClick={()=>deleteSave()}>Sil</div>
        }        
        <div className='procces-button' onClick={redyToSave}>{process}</div>
      </div>
    </div>
  )
}

export default TheComponent
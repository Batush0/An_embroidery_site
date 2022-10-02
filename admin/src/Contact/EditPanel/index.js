import React , {useEffect,useState} from 'react'
import './style.css'

const EditPanel = (props) => {
  
  
  useEffect(()=>{
    const editPanel = document.getElementsByClassName('edit-panel')[0]
    editPanel.addEventListener('click',(e)=>{
      if(e.target.classList[0] == 'input' || e.target.className == 'input__content') return false
      props.setOnEdit()
    })
    
    const input__imageID = document.getElementById('input__image-id')
    input__imageID.addEventListener('keypress',(e)=>{
      
      if(e.keyCode == 13) {props.toggleNewValue('image_id',input__imageID.value)}
    })
    
    const input__title = document.getElementById('input__title')
    input__title.addEventListener('keypress',(e)=>{
      
      if(e.keyCode == 13) {props.toggleNewValue('header',input__title.value)}
    })
    
    const input__content = document.getElementById('input__content')
    input__content.addEventListener('keypress',(e)=>{
      
      if(e.keyCode == 13) {props.toggleNewValue('content',input__content.value); e.preventDefault();}
    })
    
    const input__link = document.getElementById('input__link')
      input__link.addEventListener('keypress',(e)=>{
        
        if(e.keyCode == 13) {props.toggleNewValue('link',input__link.value)}
      })
  
    },[])

  useEffect(()=>{
      const editPanel = document.getElementsByClassName('edit-panel')[0]
      editPanel.classList.toggle('onEdit',props.onEdit)
  },[props.onEdit])

  useEffect(()=>{
    document.getElementById('input__image-id').value = null
    document.getElementById('input__title').value = null
    document.getElementById('input__content').value = null
    document.getElementById('input__link').value = null
  },[props.id])
  
  // console.log(props.data)

  return (
    <div className='edit-panel'>
      <input id='input__image-id' type='text' className='input input__image-id' placeholder="Görsel  ID'si"></input>
      <input id='input__title' type='text' className='input input__title' placeholder="Başlık"></input>
      <textarea id='input__content' placeholder='Içerik' className='input__content'></textarea>
      <input id='input__link' type='text' className='input input__link' placeholder="Hedef link"></input>
    </div>
  )
}

export default EditPanel
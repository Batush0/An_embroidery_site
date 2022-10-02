import React from 'react'
import TheComponent from '../TheComponents/.'

const Create = ({message}) => {

  const defaultCard = {
    title:{default:true,content:'A-000'}
   ,img:{default:true,content:'purple'}//src:'purple'}
   ,dimension:true
   ,size:{default:true,content:'0000x000'}
   ,hit:{default:true,content:'000'}
   ,applique:false
   ,color:''
   ,about:{has:false,detail:''}
  }

  const [card,setCard] = React.useState(defaultCard)

  async function backend(data){
    const response = await fetch('http://localhost:8180/product/create', {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    if(response.status==200){
      window.location.reload()
    }
    const resData = response.json()
    if(resData.message){
      message(resData.message)
    }
  }

  return (
    <TheComponent data={card} process={'Ekle'} backend={backend} message={message}/>
  )
}

export default Create
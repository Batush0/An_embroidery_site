import React from 'react'
import './style.css'
import TheComponent from '../TheComponents/.'

const Edit = ({message}) => {
  const [card,setCard] = React.useState({})
  const [productCode,setProductCode] = React.useState('')
  const [editable,setEditable] = React.useState(false)
  const [title,setTitle] = React.useState(undefined);
  
  function handleType(event){
    setProductCode(event.target.value)
  }

  async function handleSearch(){
    if(productCode.length){
      const response = await fetch(`http://localhost:8180/product/edit/${productCode}`)
      const data = await response.json()
      if(response.status==200){
        setCard(prew=>{
          return{
            title:data[0].name
            ,img:data[0].image_id
            ,dimension:data[0].dimension
            ,size:data[0].size
            ,hit:data[0].hit
            ,applique:data[0].applique
            ,color:data[0].color
            ,about:{has:data[0].detail_has,detail:data[0].detail_content}
            ,id:data[0].id
          }
        })
        setEditable(true)
        setTitle(data[0].name)
      }
      if(data.message) message(data.message)
    }else{
      message('Arama yapabilmen için isim girmen gerekiyor')
    }
  }

  async function backend(data){
    const response = await fetch('http://localhost:8180/product/edit', {
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({data:data,title:title})
    })
    if(response.status==200){
      window.location.reload()
    }
    const resData = await response.json()
    if(resData.message){
      message(resData.message)
    }
  }

  return (
    <div>
      {!editable&&
      <div className='the-box'>
          <input onChange={handleType} type='text' placeholder='Ürün Kodu veya Adı'></input>
          <div className='admit' onClick={handleSearch}></div>
          <h4 className='error'></h4>
      </div>
      }
      {editable&&
        <TheComponent data={card} process={'Düzenle'} backend={backend} message={message}/>
      }
    </div>
  )
}

export default Edit

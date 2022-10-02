import React from 'react'
import './style.css'

const Contact = () => {

    const [card,setCard] = React.useState([])

    
    const request = async()=>{
        setCard(await (await fetch('http://localhost:8180/contact')).json())
    }
    React.useEffect(()=>{
        request()
    },[])
    
    const Card = (props) => {
        return(
            <div id='contact-b' key={props.id}>
                <div id='contact-img' style={{background:`url(http://drive.google.com/uc?export=view&id=${props.image_id})`,backgroundRepeat:'no-repeat',backgroundSize:'contain'}}></div>
                <div id='contact-content'>
                    <h1 id='contact-header'>{props.header}</h1>
                    <p id='contact-parag'>{props.content}</p>
                    <a id='contact-link' onClick={()=>{window.location = props.link}}>⇨</a>
                </div>
            </div>
        )
    }
    

    const cards = card.map(item=><Card {...item}/>)

  return (
    <div id='container'>
        {/* <Card 
            image_id='1gbmxGuBEX7pM-X4wTQN06EP-6M_Orjr0'
            header='Lokasyon'
            content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt gravida vulputate. Fusce faucibus justo tortor, at fermentum mi vulputate id. Vivamus tincidunt erat ut est porttitor, sed condimentum ante sollicitudin. Curabitur laoreet malesuada massa. Aliquam erat volutpat. PellentesqueLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt gravida vulputate. Fusce faucibus justo tortor, at fermentum mi vulputate id. Vivamus tincidunt erat ut est porttitor, sed condimentum ante sollicitudin. Curabitur laoreet malesuada massa. Aliquam erat volutpat. PellentesqueLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt gravida vulputate. Fusce faucibus justo tortor, at fermentum mi vulputate id. Vivamus tincidunt erat ut est porttitor, sed condimentum ante sollicitudin. Curabitur laoreet malesuada massa. Aliquam erat volutpat. PellentesqueLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt gravida vulputate. Fusce faucibus justo tortor, at fermentum mi vulputate id. Vivamus tincidunt erat ut est porttitor, sed condimentum ante sollicitudin. Curabitur laoreet malesuada massa. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce nec suscipitLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt gravida vulputate. Fusce faucibus justo tortor, at fermentum mi vulputate id. Vivamus tincidunt erat ut est porttitor, sed condimentum ante sollicitudin. Curabitur laoreet malesuada massa. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce nec suscipit justo. Proin ac odio turpis. s ligula in euismod. Nullam ligula nisl, condimentum id congue et, bibendum vitae leo. Sed turpis lacus, mattis eu libero sed, fringilla tempus tortor. Sed orci nisl, suscipit vitae leo quis, faucibus congue est.'
            link='https://www.google.com'
        />
        <Card/>
        <Card/> */}
        {cards}
    </div>
  )
}

export default Contact
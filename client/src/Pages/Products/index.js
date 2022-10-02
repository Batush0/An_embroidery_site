import React , {useState , useEffect} from 'react'
import './style.css'

const Products = ({handlePage}) => {

    const [lastIndex,setLastIndex] = useState(null)
    const [requestable,setRequestable] = useState(true)
    const [cards,setCards] = useState([])

    async function requestCard(){
        const response = await fetch(`http://localhost:8180/product/requestCard/${lastIndex}`)
        const data = await response.json()
        if(response.status === 500) setRequestable(false)


        data.map(props=>{cards.push(props)})
        
        // data.map(props=>{
        //     setCards(prew=>{return [prew.push(props)]})
        // })

        setLastIndex(data[data.length-1].id)
        
        console.log(cards)
    }

    useEffect(()=>{requestCard()},[])


    const CardView = () => {

        //TODO
        const theCards = cards.map(card=><Card {...card} key={card.id}/>)

        return(
            <div id='products'>
                {theCards}
                {requestable &&
                    <>
                        <div id='getContainer'>
                            <div id='getCard' onClick={requestCard}>Daha fazla</div>
                        </div>
                        <div id='straight-line'></div>
                    </>
                }
            </div>
        )
    }


    // const Card1 = (props) => {
    //     return(
    //         <div className='card' style={{backgroundImage:`url(${props.img})`}} key={props.title}>
    //             <h6 className='dimension'>{props.dimension?'3D':'2D'}</h6>
    //             <div className='card-content'>
    //                 <h2 className='title'>{props.title}</h2>

    //                 <ul>
    //                     <li>
    //                         <h4 className='prop info'>Ebat :</h4>
    //                         <h4 className='value info'>{props.size}</h4>
    //                     </li>

    //                     <li>
    //                         <h4 className='prop info'>Vuruş :</h4>
    //                         <h4 className='value info'>{props.hit}</h4>
    //                     </li>

    //                     <li>
    //                         <h4 className='prop info'>Aplika :</h4>
    //                         <h4 className='value info'>{props.applique ? 'Var':'Yok'}</h4>
    //                     </li>
    //                 </ul>

    //                 <a className='button' 
    //                 onClick={()=>handlePage(props.title)}>ZIYARET ET</a>
    //             </div>
    //         </div>
    //     )
    // }
    const Card = (props) => {
        return(
            <div className='card' style={{background:`url(http://drive.google.com/uc?export=view&id=${props.image_id})`,backgroundSize:'cover'}} key={props.title}>
                <h6 className='dimension'>{props.dimension?'3D':'2D'}</h6>
                <div className='card-content'>
                    <h2 className='title'>{props.name}</h2>

                    <ul>
                        <li>
                            <h4 className='prop info'>Ebat :</h4>
                            <h4 className='card-value info'>{props.size}</h4>
                        </li>

                        <li>
                            <h4 className='prop info'>Vuruş :</h4>
                            <h4 className='card-value info'>{props.hit}</h4>
                        </li>

                        <li>
                            <h4 className='prop info'>Aplika :</h4>
                            <h4 className='card-value info'>{props.applique ? 'Var':'Yok'}</h4>
                        </li>
                    </ul>

                    <a className='button' onClick={()=>handlePage(props.name,props.image_id,props.size,props.hit,props.applique,props.dimension,props.id)}>ZIYARET ET</a>
                </div>
            </div>
        )
    }

    return (
    <div id='container'>
        <CardView/>
    </div>
  )
}

export default Products
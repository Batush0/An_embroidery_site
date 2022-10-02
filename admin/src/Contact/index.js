import React , {useState,useEffect} from 'react'
import './style.css'

import EditPanel from './EditPanel/.'

import image_add from './asset/add.png' 
import image_minus from './asset/minus.png' 
import image_pencil from './asset/pencil.png' 

const Contact = ({message}) => {
    
    const defaultData = {
        id:'none',
        image_id:'1ApYlwtrJ-HuRqG0VhW8qgGcdWrxDTyAt',
        header:'Başlık',
        content:'...'
        ,link:'/contact'
    }
    const defaultProcess = {
        id:null,
        onEdit:false,
        process:''
    }

    const [card,setCard] = useState([])
    const [actualDataGetted,setActualDataGetted] = useState(false)
    const [process,setProcess] = useState(defaultProcess)
    const [newData,setNewData] = useState(defaultData)
    const [creatable,setCreatable] = useState(true);
    const [aagggghh,setAagggghh] = useState({block:'',value:''})





    const setOnEdit = () => {
        setProcess(prew=>{
            return {...prew,onEdit:!prew.onEdit}
        })
    }

    const setEdit = (process,id) => {
        setProcess(prew=>{return{process:process,id:id,
            onEdit:prew.id == null ? true:(prew.id == id ? !prew.onEdit : prew.onEdit)
        }})
    }

    // delete && create happens
    const saveThings = async(process,id) => {
        var url = 'http://localhost:8180/contact'
        const body = {
            method: process == 'add' ? 'POST':'DELETE',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(process == 'add' ? newData : {id:id})
        }
        const response = await fetch(url,body)
        const data = await response.json()
        if(data.message) message(data.message)
        requestCards()
    }

    //levitating card flag
    useEffect(()=>{
        setProcess(prew=>{return {...prew,onEdit:!creatable,process:'add'}})
        
        document.getElementById('appendFlag').classList.toggle('seen',!creatable)

        document.documentElement.scrollTop = 999999;
    },[creatable])

    //requesting card's data
    const requestCards = async() => {
        const response =  await fetch('http://localhost:8180/contact')
        const data = await response.json()
        if(response.status == 200){
            setCard(data)
        }
        else{
            message(data.message)
        }
        setActualDataGetted(true)
        setProcess(defaultProcess)
        setCreatable(true)
    }

    useEffect(()=>{if(!actualDataGetted)requestCards()},[])

    //updating values
    const toggleNewValue = (block,value) => {setAagggghh({block:block,value:value})}

    const updateCard = () => {

        fetch('http://localhost:8180/contact',
            {method:'PATCH',headers:{"Content-Type":"application/json"},
            body:JSON.stringify({block:aagggghh.block,data:aagggghh.value,id:process.id})
            }).then(res => res.json()).then(data=>{
                if(data.message)message(data.message)
            }).catch(err=>console.log(err))

        
        setCard(prew=>
            prew.map(item=>
                item.id == process.id ? {...item,[aagggghh.block]:aagggghh.value} : item
            )
        )
    }

    useEffect(()=>{
        if(process.process == 'add'){
            setNewData(prew=>{
                return {...prew,[aagggghh.block]:aagggghh.value}
            })
        }else if(process.process == 'edit'){

            

            updateCard()
        }
    },[aagggghh])

    //card structure
    const Card = (props) => {
        return(
            <div id='contact-container' key={props.id}>
                <div id='contact-b'>
                    <div id='contact-img' style={{background:`url(http://drive.google.com/uc?export=view&id=${props.image_id})`,backgroundRepeat:'no-repeat',backgroundSize:'contain'}}></div>
                    <div id='contact-content'>
                        <h1 id='contact-header' style={{color:[props.process == 'add' ? 'rgb(0 0 0 / 0.6)':'']}} >{props.header}</h1>
                        <p id='contact-parag' style={{color:[props.process == 'add' ? 'rgb(0 0 0 / 0.4)':'']}} >{props.content}</p>
                        <a id='contact-link' onClick={()=>{window.location = props.link}} >⇨</a>
                    </div>
                </div>
                <div id='proccess-buttons' onClick={()=>{saveThings(props.process,props.id)}}>{/* onClick={()=>{saveThings(props.process,props.id)}}>  */}
                    <div className='process-button process' style={{backgroundImage:`url(${props.process == 'add' ? image_add:image_minus})`}}></div>
                </div>
                <div id='proccess-buttons' onClick={()=>{setEdit(props.process,props.id)}}>
                    <div className='process-button edit' style={{backgroundImage:`url(${image_pencil})`}}></div>
                </div>
            </div>
        )
    }

    const cards = card.map(piece=>
        <Card {...piece} process='edit'/>
    )

  return (
     <div id='container'>

        {cards}

        {!creatable &&
            <>
                {card[0] && <hr className='straight'></hr>}
                <Card process='add' image_id={newData.image_id} header={newData.header} content={newData.content} link={newData.link} id={newData.id}/> 
            </>
        }
        <EditPanel {...process} setOnEdit={setOnEdit} toggleNewValue={toggleNewValue}/>

        <div id='appendFlag' onClick={()=>{setCreatable(false)}}>Oluştur</div>
     </div>
  )
}

export default Contact
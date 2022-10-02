import './App.css';
import React , {useState,useEffect} from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';

import MenuCard from './MenuCards';

import Product ,{Products} from './Product';
import Edit from './Edit/.'
import Create from './Create/.'

import Contact from './Contact/.';

// import About from './About/.';

import {NotificationPopUp} from './NotificationPopUp'

function App() {

  const [apiCallBack,setApiCallBack] = useState(['',false])
  const [gotMessage,setGotMessage] = useState(false)

  function popUpMessage(script){
    setApiCallBack(prew=>[script,!prew[1]])
    setGotMessage(true)
  }

  if(gotMessage) setTimeout(()=>{setGotMessage(false)},4000)
          

  const guide = (to) => {
    window.location = to
  }
  // const LordsTown = () => {
  //   window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  // }
  
  const Main=()=>{
    return(
      <div id='app'>
        <MenuCard title='Ürünler' guide={guide} text='Yallah' href={'product'} img='1Hj3CEuPlnywSWmlWLO4obZWpr41X2nK0'/>
        <MenuCard title='İletişim' guide={guide} text={'Lets Go'} href='contact' img={'1pHbeetS18eUyFFO4PjDeOfItJtLva5Dz'}/>
        <MenuCard title='Wow' guide={guide} text={'Aaağğ'} href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' img={'1tjth1cr-KaaQfv16r5bNBXbL5j9ts_RA'}/>
      </div>
    )
  }

  return (
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path={'/product'} element={<Product guide={guide}/>}/>
            <Route path={'/product/1'} element={<Products/>}/>
            <Route path={'/product/edit'} element={<Edit message={popUpMessage}/>}/>
            <Route path={'/product/create'} element={<Create message={popUpMessage} />}/>
            <Route path={'/contact'} element={<Contact message={popUpMessage}/>}/>
            {/* <Route path={'/lordsTown'} element={<LordsTown/>}/> */}
          </Routes>
          <NotificationPopUp script={apiCallBack[0]} onAction={gotMessage}/>
      </BrowserRouter>
    );
}

export default App;

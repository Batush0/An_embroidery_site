import React,{useState} from 'react'
import CardContact from './CardContact'
import NavBar from './NavBar'

import Main from './Pages/Main/.'
// import About from './Pages/About/.'
import Contact from './Pages/Contact/.'
import Products from './Pages/Products/.'
import Product from './Pages/Products/Product'

import {BrowserRouter,Route,Routes } from 'react-router-dom'

import './Styles/App.css'


const App = () => {

  window.addEventListener('scroll',function(){
    var header = document.querySelector('header')
    header.classList.toggle('sticky',window.scrollY > 0)

    // var contact = document.getElementById('contact-body')
    // contact.classList.toggle('sticky',window.scrollY > 0)
  })

  const [product,setProduct] = useState(null);

  function togglePage(title,img,size,hit,applique,dimension,id){
    setProduct({title:title,img:img,size:size,hit:hit,applique:applique,dimension:dimension,id:id})
  }

  return (
    <BrowserRouter>

      {/* <CardContact /> */}
      <NavBar/>

      <Routes>

      <Route path='/' element={<Main/>} />
      {/* <Route path='/about' element={<About/>} /> */}
      <Route path='/contacts' element={<Contact/>} />
      
      <Route path='/products' element={
        product === null 
        ? <Products handlePage={togglePage} />
        : <Product {...product}/>} 
      />

      </Routes >

    </BrowserRouter>
  )
}

export default App
import React from 'react'
import './App.css';



import MenuCard from './MenuCards'

const Product = ({guide}) => {

   
      function Card(){
        return(
            <div id='app'>
              <MenuCard title={'Ürünler'} guide={guide} text='GO' href='product/1' img={'1AsNNiydHJgHEfb6FrojIF21GZhpkPtov'}/>
              <MenuCard title={'Düzenle'} guide={guide} text='Huppaa' href='product/edit'  img={'1qLjJW8T0M2zpDg2we6FQgtIRRppH7T2v'}/>
              <MenuCard title={'Ekle'} guide={guide} text='Vın' href='product/create' img={'1X61FD59dKi6jAeMjhG661EPVsqHazZkr'}/>
            </div>
        );
      }

  return (
    <div>
        <Card/>
    </div>
  )
}

export default Product


export const Products = () => {
    window.location='http://localhost:3000/products'
}

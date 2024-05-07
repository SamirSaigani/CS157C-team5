import { PRODUCTS } from '../../products'
import React from 'react'
import {Product} from "../shop/product";

export const Shop = () => {
  return (
    <div className='shop'>
        <div className='shopTitle'>
        <h1> shopsconnect</h1>
        </div>
        <div className='products'> {PRODUCTS.map((product) => <Product data={product}/> )}
            
        </div>
    </div>
  )
}

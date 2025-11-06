import { h2 } from 'framer-motion/client';
import React from 'react'
import { Link } from 'react-router';

function Products({ singleData }) {
  const { _id, title, price_min, price_max } = singleData;
  console.log(singleData)
  return (
    <div className="card bg-base-100 shadow-sm text-center">
      <figure className='p-4'>
        <img className='rounded'
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes" />
      </figure>
      <div className="card-body text-center">
        <h2 className="card-title mx-auto">{title}</h2>
        <p> Price: {price_min} - {price_max}</p>
        <div className="card-actions mx-auto ">
          <Link to={`productsDetails/${_id}`} className="btn btn-primary"> Details </Link>
        </div>
      </div>
    </div>
  )
}

export default Products

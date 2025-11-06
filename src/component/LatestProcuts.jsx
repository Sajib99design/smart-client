import React, { use } from 'react'
import Products from './Products';

function LatestProcuts({ latestProductsPromise }) {
    const latestData = use(latestProductsPromise);
    console.log(latestData);
    return (
        <div>
            <div>
                <h2 className='text-4xl font-bold text-center my-7'>Recent Products </h2>
            </div>
            <div className='md:grid grid-cols-3 justify-center items-center gap-6'>
                {
                    latestData.map(singleData => <Products key={singleData._id} singleData={singleData} > </Products>)
                }
            </div>
        </div>
    )
}

export default LatestProcuts

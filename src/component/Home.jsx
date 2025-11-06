import React from 'react'
import Hero from './Hero'
import LatestProcuts from './LatestProcuts';

const latestProductsPromise = fetch('https://smart-deal-eta.vercel.app/latest-products')
  .then(res => res.json());
function Home() {
  return (
    <div >
      <Hero></Hero>
      <LatestProcuts latestProductsPromise={latestProductsPromise}> </LatestProcuts>
    </div>
  )
}

export default Home

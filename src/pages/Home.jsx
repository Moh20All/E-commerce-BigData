import React from 'react'
import LandingPage from '../components/LandingPage'
import ProductSections from '../components/ProductCard'
import BestSellerSection from '../components/BestSellerSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='font-[poppins]'>
      <LandingPage/>
      <ProductSections/>
      <BestSellerSection/>
      <Footer/>
    </div>
  )
}

export default Home

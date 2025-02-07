import React from 'react';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import headphones from '../imgs/headph.png'
import logo1 from "../imgs/logo1.png"
import logo2 from "../imgs/logo2.png"
import logo3 from "../imgs/logo3.png"
import logo4 from "../imgs/logo4.png"
import logo5 from "../imgs/logo5.png"
import logo6 from "../imgs/logo6.png"
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const navigate = useNavigate(); // Initialize navigation hook

  const handleClick = () => {
    navigate(`/shop`); // Navigate to product details page
  };
    const imgs = [logo1,logo2,logo3,logo4,logo5,logo6]
    const handlelogin = ()=>{
      window.location.href = "/login"
    }
  return (
    <div className="min-h-screen bg-slate-700">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold">Rlgant.</div>
        
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-600">Home</a>
          <a href="/shop" className="hover:text-gray-600">Shop</a>
          <a href="#" className="hover:text-gray-600">Product</a>
          <a href="#" className="hover:text-gray-600">Contact Us</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 cursor-pointer" />
          <User onClick={handlelogin} className="w-5 h-5 cursor-pointer" />
          <ShoppingCart onClick={handleClick} className="w-5 h-5 cursor-pointer" />
          <Menu className="md:hidden w-5 h-5 cursor-pointer" />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-5xl font-bold mb-4">
            Listen to the{' '}
            <span className="text-blue-600">amazing</span>
            {' '}music sound.
          </h1>
          <p className="text-xl mb-6 text-gray-700">
            Experience music like never before
          </p>
          <button onClick={handleClick} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors">
            Shopping Now
          </button>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <img 
            src={headphones}
            alt="Person enjoying music with headphones"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Logo Strip */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center flex-wrap gap-8">
          {imgs.map((item) => (
            <div key={item} className="grayscale opacity-50 hover:opacity-100 transition-opacity">
              <img
                src={item}
                alt={`Partner logo ${item}`}
                className="h-8 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
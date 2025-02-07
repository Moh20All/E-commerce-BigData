import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ title, price, isHot, rating,img }) => {

  return (
    <div className="group cursor-pointer">
      <div className="relative mb-3">
        <img 
          src={img}
          alt={title}
          className="h-40 object-contain w-full rounded-lg bg-gray-100"
        />
        {isHot && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            HOT
          </span>
        )}
        <button className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Add to cart
        </button>
      </div>
      <div className="flex items-center mb-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <h3 className="font-medium text-sm">{title}</h3>
      <p className="text-gray-200">${price}</p>
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 5
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds };
        
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) return { ...prev, minutes: newMinutes, seconds: 59 };
        
        const newHours = prev.hours - 1;
        if (newHours >= 0) return { ...prev, hours: newHours, minutes: 59, seconds: 59 };
        
        const newDays = prev.days - 1;
        if (newDays >= 0) return { ...prev, days: newDays, hours: 23, minutes: 59, seconds: 59 };
        
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4">
      <div className="text-center">
        <div className="bg-black text-white rounded px-4 py-2 text-xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
        <div className="text-sm mt-1">Days</div>
      </div>
      <div className="text-center">
        <div className="bg-black text-white rounded px-4 py-2 text-xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
        <div className="text-sm mt-1">Hours</div>
      </div>
      <div className="text-center">
        <div className="bg-black text-white rounded px-4 py-2 text-xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
        <div className="text-sm mt-1">Minutes</div>
      </div>
      <div className="text-center">
        <div className="bg-black text-white rounded px-4 py-2 text-xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
        <div className="text-sm mt-1">Seconds</div>
      </div>
    </div>
  );
};

const BestSellerSection = () => {
  const bestSellers = [
    { id: 1, title: "WH-1000XM5 Wireless Noise Cancelling", price: "399.95", rating: 5, isHot: true,img:"https://images.unsplash.com/photo-1729327741049-162ce089640a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "SoundPro", price: "279.95", rating: 5, isHot: true,img:"https://plus.unsplash.com/premium_photo-1681666713641-8d722b681edc?q=80&w=1510&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, title: "Sony - WH-CH720N Wireless", price: "149.95", rating: 5, isHot: true,img:"https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: "True Wireless Earbuds", price: "79.95", rating: 5, isHot: true,img:"https://images.unsplash.com/photo-1734776581608-617ca1da56da?q=80&w=1532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, title: "Studio Pro", price: "249.99", rating: 5, isHot: true,img:"https://images.unsplash.com/photo-1680113727130-29748b7c9ddc?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 6, title: "Pro Wireless Beats", price: "179.95", rating: 5, isHot: true,img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 7, title: "Elite Headphones", price: "349.95", rating: 5, isHot: true,img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 8, title: "XM990N Wireless", price: "349.99", rating: 5, isHot: true,img:"https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
  ];
  const navigate = useNavigate(); // Initialize navigation hook

  const handleClick = () => {
    navigate(`/shop`); // Navigate to product details page
  };
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Best Seller Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Best Seller</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      {/* Promotion Section */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-amber-800">
          <img 
            src="https://images.unsplash.com/photo-1556742208-999815fca738?q=80&w=1498&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Person wearing headphones"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-yellow-400 p-12 flex flex-col justify-center">
          <div className="max-w-md">
            <span className="text-sm font-semibold">PROMOTION</span>
            <h2 className="text-3xl font-bold mt-2 mb-4">Hurry up! 40% OFF</h2>
            <p className="mb-6">Thousands of high tech are waiting for you</p>
            <CountdownTimer />
            <button onClick={handleClick} className="mt-8 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors">
              Shop now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerSection;
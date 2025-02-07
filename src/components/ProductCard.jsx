import React from 'react';
import { Star, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ title, price, isNew, rating,img }) => {
  const navigate = useNavigate(); // Initialize navigation hook

  const handleClick = () => {
    navigate(`/shop`); // Navigate to product details page
  };
  return (
    <div onClick={handleClick} className="group cursor-pointer">
      <div className="relative mb-3">
        <img 
          src={img} 
          alt={title}
          className="w-full rounded-lg bg-gray-100 h-40 object-contain"
        />
        {isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            NEW
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
      <h3 className="font-medium">{title}</h3>
      <p className="text-gray-200">${price}</p>
    </div>
  );
};

const CollectionCard = ({ title, image }) => {
  const navigate = useNavigate(); // Initialize navigation hook

  const handleClick = () => {
    navigate(`/shop`); // Navigate to product details page
  };
  return (
    <div onClick={handleClick} className="relative rounded-lg overflow-hidden group cursor-pointer">
      <img 
        src={image}
        alt={title}
        className="w-full bg-gray-100"
      />
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <button className="text-sm underline hover:no-underline">
          Collection →
        </button>
      </div>
    </div>
  );
};

const ProductSections = () => {
  const newArrivals = [
    { id: 1, title: "Double Zero 2 Wireless Headphones", price: "259.95", rating: 5, isNew: true,img:"https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1413&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Pro 2 Wireless Noise Cancelling", price: "349.95", rating: 5, isNew: true,img:"https://plus.unsplash.com/premium_photo-1721133230729-f76c4b036a58?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, title: "H225 Wireless Noise Cancelling", price: "199.95", rating: 4, isNew: true,img:"https://plus.unsplash.com/premium_photo-1721133331845-785b913a9ae2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: "Air True Wireless Earbuds", price: "79.95", rating: 5, isNew: true,img:"https://images.unsplash.com/photo-1727542908464-789161b9bfe6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, title: "Studio Pro Wireless", price: "229.95", rating: 5, isNew: true,img:"https://images.unsplash.com/photo-1522905341340-7bac448e67fe?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
  ];
  const navigate = useNavigate(); // Initialize navigation hook

  const handleClick = () => {
    navigate(`/shop`); // Navigate to product details page
  };
  return (
    <div className="container mx-auto px-6 py-12">
      {/* New Arrivals Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <MoreHorizontal className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {newArrivals.map(product => (
            <ProductCard onClick={handleClick} key={product.id} {...product} />
          ))}
        </div>
      </div>

      {/* Shop Collection Section */}
      <div >
        <h2 className="text-2xl font-bold mb-6">Shop Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CollectionCard title="Flagship Phones" image={"https://images.unsplash.com/photo-1635870723802-e88d76ae324e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
          <div className="grid grid-cols-1 gap-6">
            <CollectionCard title="GPU's" image={"https://images.unsplash.com/photo-1695499310372-79328365b7cf?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
            <CollectionCard title="Watches" image={"https://images.unsplash.com/photo-1706289835536-3aa7b81aa2fd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSections;
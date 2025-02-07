import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, StarIcon } from "lucide-react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Initialize navigation hook

  const handleClick = () => {
    navigate(`/products/${product.ProductId}`); // Navigate to product details page
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm group cursor-pointer"
      onClick={handleClick} // Add click handler
    >
      <div className="relative">
        <img
          src={product.ImageURL}
          alt={product.ProductTitle}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()} // Prevent navigating when clicking favorite button
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium">{product.ProductTitle}</h3>
        <p className="text-gray-500">{product.Colour} - {product.Usage}</p>
        <div className="flex items-center space-x-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="h-4 w-4 fill-current text-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

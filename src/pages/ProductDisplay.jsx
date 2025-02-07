import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Loader2 } from 'lucide-react';

const ProductDisplay = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left side - Image */}
        <div className="relative bg-gray-50 rounded-lg p-8">
          <img
            src={product.ImageURL || "/api/placeholder/400/400"}
            alt={product.ProductTitle}
            className="w-full h-auto object-contain"
          />
          {/* Navigation dots */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 space-y-4">
            <button className="w-2 h-2 rounded-full bg-gray-800"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
          </div>
        </div>

        {/* Right side - Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">{product.ProductTitle}</h1>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">265 Reviews</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                <span className="text-sm">Category: {product.Category}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <span className="text-sm">Color: {product.Colour}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm">Type: {product.ProductType}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Usage: {product.Usage}</span>
              </div>
            </div>
          </div>

          {/* Purchase Options Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="purchase-option"
                id="subscribe"
                className="w-4 h-4"
                defaultChecked
              />
              <label htmlFor="subscribe">
                <div>Subscribe & save</div>
                <div className="text-sm text-gray-600">Delivery every 4 Months</div>
              </label>
              <div className="ml-auto">$50.00</div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="purchase-option"
                id="onetime"
                className="w-4 h-4"
              />
              <label htmlFor="onetime">One-time purchase</label>
              <div className="ml-auto">$25.00</div>
            </div>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
            Add to Cart — $20.00
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
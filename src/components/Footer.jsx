import React from 'react';
import { Truck, RotateCcw, Lock, PhoneCall, Instagram, Facebook } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-600 p-6 rounded-lg flex flex-col items-center text-center">
    <Icon className="w-6 h-6 mb-3" />
    <h3 className="font-medium mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const InstagramPost = ({ imageUrl }) => (
  <div className="relative group cursor-pointer">
    <img 
      src="/api/placeholder/300/300" 
      alt="Instagram post"
      className="w-full aspect-square object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
      <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
    </div>
  </div>
);

const Footer = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Order above $200"
    },
    {
      icon: RotateCcw,
      title: "Money-back",
      description: "30 days guarantee"
    },
    {
      icon: Lock,
      title: "Secure Payments",
      description: "Secured by Stripe"
    },
    {
      icon: PhoneCall,
      title: "24/7 Support",
      description: "Phone and chat support"
    }
  ];

  return (
    <footer className="bg-gray-600">
      {/* Features Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Instagram Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h3 className="text-sm text-gray-600 mb-2">INSTAGRAM</h3>
          <p className="mb-2">Follow us on social media for news discount & promotions</p>
          <a href="#" className="text-gray-600">@3legant_official</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <InstagramPost key={item} />
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-600">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <img 
                src="/api/placeholder/200/200" 
                alt="Newsletter"
                className="w-32 h-32 object-cover mr-6"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">Join Our Newsletter</h3>
                <p className="text-gray-600">Sign up for deals, new products and promotions</p>
              </div>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 md:w-64 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-black"
              />
              <button className="px-6 py-2 bg-black text-white rounded-r hover:bg-gray-800 transition-colors">
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-6">3legant.</h2>
              <p className="text-sm text-gray-400">Headphones Store</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
              <a href="#" className="hover:text-gray-300">Home</a>
              <a href="#" className="hover:text-gray-300">Shop</a>
              <a href="#" className="hover:text-gray-300">Product</a>
              <a href="#" className="hover:text-gray-300">Blog</a>
              <a href="#" className="hover:text-gray-300">Contact Us</a>
            </nav>
          </div>
          <hr className="border-gray-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex gap-4 mb-4 md:mb-0">
              <span>Copyright © 2024 3legant. All rights reserved</span>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Use</a>
            </div>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-white" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import ProductItem from "../components/ProductItem";

const ITEMS_PER_PAGE = 50; // Show 50 products per page

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategory] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
        setCategoriesLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
        setCategoriesLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
      });
      
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold text-center">Shop Page</h1>
          <p className="text-gray-500 text-center">Discover amazing products</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Categories */}
            {categoriesLoading ? (
  <p className="text-gray-500">Loading categories...</p>
) : (
  <ul className="space-y-2">
    {categories.map((category) => (
      <li key={category.CategoryId}>
        <button className="text-gray-600 hover:text-black">
          {category.CategoryName}
        </button>
      </li>
    ))}
  </ul>
)}

            {/* Price Filter */}
            <div>
              <h2 className="font-semibold mb-4">Price Range</h2>
              <input type="range" className="w-full" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {/* Filters Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 rounded border bg-gray-100 hover:bg-gray-200"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <span className="text-gray-600">Page {currentPage} of {totalPages}</span>

                <button
                  className="p-2 rounded border bg-gray-100 hover:bg-gray-200"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Loading & Error Handling */}
            {loading && <p className="text-center text-gray-500">Loading products...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {!loading && !error && displayedProducts.map((product) => (
                <ProductItem key={product.ProductId} product={product} />
              ))}
            </div>

            {/* Bottom Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page + 1}
                  className={`px-4 py-2 border rounded ${currentPage === page + 1 ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Newsletter */}
      <section className="bg-gray-100 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-6">Subscribe to get special offers and updates</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border"
            />
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;

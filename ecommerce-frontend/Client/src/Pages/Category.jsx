import React, { useState } from 'react';
import "../Styles/shop.css";
import { Link, useParams } from 'react-router-dom';

const products = [
  { id: 1, title: 'Biker Jacket', price: 624, image: 'https://i.postimg.cc/PqKSVqKD/product-8.jpg', category: 'clothing' },
  { id: 2, title: 'Chest Bag', price: 448, image: '/images/product-2.jpg', category: 'accessories' },
  { id: 3, title: 'Textured Cap', price: 690, image: '/images/product-3.jpg', category: 'accessories' },
  { id: 4, title: 'Grey Scarf', price: 949, image: '/images/product-2.jpg', category: 'accessories' },
  { id: 5, title: 'T-shirt', price: 466, image: '/images/product-2.jpg', category: 'clothing' },
  { id: 6, title: 'Scarf', price: 228, image: '/images/product-2.jpg', category: 'accessories' },
  { id: 7, title: 'T-shirt', price: 399, image: '/images/product-2.jpg', category: 'clothing' },
  { id: 8, title: 'Perfume Set', price: 129, image: '/images/product-2.jpg', category: 'accessories' },
  { id: 9, title: 'Grey Backpack', price: 899, image: '/images/product-2.jpg', category: 'accessories' },
  { id: 10, title: 'Leather Belt', price: 299, image: '/images/product-2.jpg', category: 'accessories' },
  { id: 11, title: 'Casual Sneakers', price: 799, image: '/images/product-2.jpg', category: 'shoes' },
  { id: 12, title: 'Watch', price: 249, image: '/images/product-2.jpg', category: 'accessories' },
];

const Category = () => {
  const { categoryName } = useParams();
  const [sortOrder, setSortOrder] = useState('low-to-high');

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Filter and sort products by category and price
  const filteredProducts = products.filter(product => product.category === categoryName);
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return sortOrder === 'low-to-high' ? a.price - b.price : b.price - a.price;
  });

  return (
    <section>
      {/* Top Banner */}
      <div className='bg-[#F3f2EE] w-full h-[140px] flex justify-center items-center'>
        <div className='w-[60%]'>
          <h1 className='text-[24px] font-bold capitalize'>{categoryName}</h1>
          <p className='text-[15px] mt-1'>
            <Link to="/">Home</Link> / <label className='text-gray-500 capitalize'>{categoryName}</label>
          </p>
        </div>
      </div>

      {/* Shop Section*/}
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mt-8 block lg:hidden">
          <button className="flex items-center gap-2 border-b border-gray-400 pb-1 text-gray-900">
            <span className="text-sm font-medium">Filters & Sorting</span>
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>

        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Filters*/}
          <div className="hidden lg:block space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">Sort By Price</label>
              <select onChange={handleSortChange} className="mt-1 rounded-sm border-gray-300 text-sm">
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product) => (
                <li key={product.id} className="group relative overflow-hidden rounded-lg shadow-md bg-white">
                  <img src={product.image} alt={product.title} className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">{product.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">₹{product.price}</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-700">
                      Add to Cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;

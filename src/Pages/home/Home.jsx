import React, { useContext, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import Filter from '../../Components/filter/Filter';
import HeroSection from '../../Components/heroSection/HeroSection';
import ProductCard from '../../Components/productCard/ProductCard';
import Track from '../../Components/track/Track';
import Testimonial from '../../Components/testimonial/Testimonial';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../Redux/cartSlice';

import {Link} from 'react-router-dom'
const Home = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);

  const addCart = () => {
    dispatch(addToCart('shirt'));
  };

  const deleteCart = () => {
    dispatch(deleteFromCart('shirt'));
  };

  const handleSeeMore = () => {
    // Increase the number of displayed products
    setDisplayedProducts((prevCount) => prevCount + 6);
  };

  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allproducts'}>
          <button className=' bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
        </Link>
      </div>
      <Track />
      <Testimonial />
    </Layout>
  );
};

export default Home;

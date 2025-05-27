import React from "react";
import Product from "./Product";

const Home = () => {
  return (
    <div className="md:mt-35 mt-50 mb-40">
      <h1 className="font-semibold text-4xl">Latest Products</h1>
      <div className="grid  md:grid-cols-3 gap-5 px-10 pt-10">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default Home;

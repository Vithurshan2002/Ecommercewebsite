import React from "react";
import { FaSearch } from "react-icons/fa";
const Navbar = () => {
  return (
    <div className="bg-black flex justify-between items-center py-4 px-5">
      <h1 className="text-4xl font-bold text-white font-serif">
        Ultra <span className="text-red-300"> Ecom</span>
      </h1>
      <div className="flex border p-1 space-x-1 bg-white rounded-full items-center w-1/2  outline-green-900 active:outline-4 transition-all">
        <input type="text" className="bg-white outline-0 ps-3 rounded-2xl italic font-semibold overflow-hidden flex-1 "  placeholder="Enter the Product"/>
        <div className=" ">{<FaSearch className="text-red-600 hover:cursor-pointer text-xl hover:text-green-700" />}</div>
      </div>

      <div className="flex space-x-4 items-center font-serif">
        <button className="bg-green-400 py-1 px-3 font-bold text-white rounded-xl  hover:cursor-pointer hover:bg-green-300">Login</button>
        <div className="flex gap-2 items-center text-white">
          <p className="font-bold">Cart</p>
          <p className=" p-1 bg-green-500" >1</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

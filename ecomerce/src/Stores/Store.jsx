import {configureStore} from '@reduxjs/toolkit';
import Product from '../../src/Pages/Slices/ProductSlice';

const Store=configureStore({
    reducer:{
        product:Product,
    }
})
export default Store;
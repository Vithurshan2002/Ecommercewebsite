import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers:{
    getData:(state,payload)=>{

    },
  }
});

export const{getData}=productSlice.actions;


export default productSlice.reducer;





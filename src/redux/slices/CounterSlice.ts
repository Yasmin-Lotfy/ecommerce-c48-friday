import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 10,
};

export const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //  action creators (methods )
    increament: (state) => {
      state.counter++;
    },
    decreamnt: (state) => {
      state.counter--;
    },
    addByAmount :(state, action)=>{
        console.log(action);
        state.counter += action.payload;
        

    }
  },
});



export const CounterReducer = CounterSlice.reducer;

export const {decreamnt , increament , addByAmount} = CounterSlice.actions;
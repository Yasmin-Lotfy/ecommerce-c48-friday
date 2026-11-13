
import { configureStore } from '@reduxjs/toolkit'
import { CounterReducer, CounterSlice } from './slices/CounterSlice';
import { ProductReducer } from './slices/ProductSlice';


export const store = configureStore({

    reducer:{
        // every slice with its reducer 
        counter :CounterReducer,
        product  :ProductReducer
       
    }
})


export type RootState = ReturnType <typeof store.getState> 
export type AppDispatch = typeof store.dispatch;
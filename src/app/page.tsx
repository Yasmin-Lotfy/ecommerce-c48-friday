"use client";
import { Button } from "@/components/ui/button";
import {
  addByAmount,
  decreamnt,
  increament,
} from "@/redux/slices/CounterSlice";
import { productAction } from "@/redux/slices/ProductSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { counter } = useSelector((state: RootState) => state.counter);

  const {product} = useSelector((state:RootState)=> state.product);
const dispatch = useDispatch<AppDispatch>()!


  useEffect(()=>{
    dispatch(productAction())
  },[])


  return (
    <div className="text-center my-10 text-lg font-bold ">
      <Button onClick={() => dispatch(increament())}>+</Button>
      <h2>Counter :{counter}</h2>
      <Button onClick={() => dispatch(decreamnt())}>-</Button>
      <Button onClick={() => dispatch(addByAmount(50))}>50</Button>
    </div>
  );
}

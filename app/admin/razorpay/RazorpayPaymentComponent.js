// import { useRefreshTokenQuery } from '@/redux/features/api/apiSlice';
"use client"
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { redirect } from "next/navigation";

const RazorpayPaymentComponent = ({ user,data }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [createOrder, { data: orderData, error,isSuccess }] = useCreateOrderMutation();
  // const { data: refreshData, error: refreshError, isLoading: isRefreshLoading } = useRefreshTokenQuery();
  console.log("data in razorpay",data)
  useEffect(() => {
    const loadRazorpay = async () => {
      if (scriptLoaded) return; // Prevent loading the script again if already loaded

      try {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          setScriptLoaded(true); // Update state to indicate script is loaded
          checkoutHandler(); // Call the checkout handler after script loads
        };
        document.body.appendChild(script);
      } catch (error) {
        console.log("Error loading Razorpay script:", error);
      }
    };

    loadRazorpay();
  }, [scriptLoaded]); // Dependency array with scriptLoaded ensures this runs once

 

  // useEffect(()=>{
  //   if(isSuccess){
       
  //   }
  // },[isSuccess])


  const checkoutHandler = async () => {
    

    try {
      

      const { data: { order } } = await axios.post("https://courses-server-wvn2.onrender.com/api/v1/checkout", {
        amount: data.price,
        user
      });

      // console.log("key",process.env.NEXT_PUBLIC_RAZORPAY_KEY);
      

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Wisdomkart",
        description: "Test Transaction",
        image: "https://i.postimg.cc/Zn2MGNsp/1.png",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyUrl = "https://courses-server-wvn2.onrender.com/api/v1/paymentverification";
            const {data:VerifyData} = await axios.post(verifyUrl, response);
            
            // console.log("response from verifyUrl",res)

            if (VerifyData.success) {
              console.log("reached in success condition")
              console.log("courseId",data._id)
              
              createOrder({ courseId: data._id});

            } else {
              console.log("Payment not received, please try again");
            }
          } catch (error) {
            console.log(error);
          }
            //redirect cannot be inside a try catch block
          redirect(`/course-acecess/${data._id}`)
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log("Error in checkoutHandler:", error);
    }
  };
  console.log("courseId",data._id)
  return (
    <div>
      {/* Render any additional UI components here if needed */}
    </div>
  );
};

export default RazorpayPaymentComponent;

import { useRefreshTokenQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { redirect } from "next/navigation";

const RazorpayPaymentComponent = ({ user,data }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [createOrder, { data: orderData, error,isSuccess }] = useCreateOrderMutation();
  // const { data: refreshData, error: refreshError, isLoading: isRefreshLoading } = useRefreshTokenQuery();
  
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
      const key = "rzp_test_AehxyIGhRXKphi";

      const { data: { order } } = await axios.post("http://localhost:8000/api/v1/checkout", {
        amount: 1000,
        user
      });

      

      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Wisdomkart",
        description: "Test Transaction",
        image: "https://i.postimg.cc/Zn2MGNsp/1.png",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyUrl = "http://localhost:8000/api/v1/paymentverification";
            const {data:VerifyData} = await axios.post(verifyUrl, response);
            
            // console.log("response from verifyUrl",res)

            if (VerifyData.success) {
              console.log("reached in success condition")
              console.log("courseId",data._id)
              
              createOrder({ courseId: data._id});

              redirect(`/course-acecess/${data._id}`)


            } else {
              console.log("Payment not received, please try again");
            }
          } catch (error) {
            console.log(error);
          }
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

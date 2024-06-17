'use client'
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import Heading from "../../../app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = { id: string };

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { user } = useSelector((state: any) => state.auth);


  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishableKey;
      setStripePromise(loadStripe(publishablekey));
    }

    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent({amount,user});
    }
  }, [config, data]);


  // const { data: userData } = useLoadUserQuery(undefined, {});
  //   console.log("userData in details",userData)




  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);
  // console.log("id",id)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + "- WisdomKart"}
            description={`Wisdomkart is one stop solution of business professionals`}
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />

          {stripePromise && (
            <CourseDetails
              data={data?.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              id={id}
              setPaymentModal={setOpen}
            />
          )}

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;

import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Rating from "@/app/utils/Rating";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

import RazorpayPaymentComponent from "@/app/admin/razorpay/RazorpayPaymentComponent";

type Props = {  
  data: any;
  clientSecret: string;
  stripePromise: any;
  id:string
};

const CourseDetails = ({ data, stripePromise, clientSecret,id }: Props) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const user = userData?.user;
  const [open, setOpen] = useState(false);

  // const discountPercentage =
  //   ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  // const discountPercentagePrice = discountPercentage.toFixed(0);

  const discountPercentage = 
  ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

// Convert to string with two decimal places
const discountPercentagePrice = discountPercentage.toFixed(2);

console.log("discountPercentagePrice",discountPercentagePrice)

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

    // console.log("purchased",isPurchased)

  const handleOrder = () => {
    // console.log("clicked");
    setOpen(true);
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-3 text-black dark:text-white">
        <div className="w-full flex flex-row-reverse 800px:flex-col">
          <div className="w-full 800px:w-[35%] relative  ">
            <div className="sticky  top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="pt-5 texts-[25px] ">
                  {data?.price === 0 ? "Free" : data?.price + " INR"}
                </h1>

                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80  ">
                  {data?.estimatedPrice} INR
                </h5>

                <h4 className="pl-5 pt-4 text-[22px]  ">
                  {discountPercentagePrice}% Off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] my-3  font-Poppins cursor-pointer !bg-[crimson]`}
                    href={`/course-access/${data._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  
                  
                  <div
                    className={`${styles.button} !w-[180px] my-3  font-Poppins cursor-pointer !bg-[crimson]`}
                    onClick={handleOrder}
                  >
                    Buy Now {data?.price} INR
                  </div>


                )}
              </div>
              <br />
              <p className="pb-1">• Full lifetime access </p>
              <p className="pb-1">• Premium Support </p>
              <p className="pb-1">• Certificate of Completion </p>
            </div>
          </div>
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">
              {data?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Rating rating={data?.ratings} />
                <h5 className="text-black dark:text-white">
                  {data?.revies?.length} Reviews
                </h5>
              </div>
              <h5> {data?.purchased} Students</h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What you will learn from this course ?
            </h1>
            <div>
              {data?.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1 ">
                    <IoCheckmarkDoneOutline size={20} />
                  </div>

                  <p className="pl-2">{item.title}</p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">
              What are the prerequisites for starting this course?
            </h1>
            <div>
              {data?.prerequisites?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1 ">
                    <IoCheckmarkDoneOutline size={20} />
                  </div>

                  <p className="pl-2">{item.title}</p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">
              Course Overview
            </h1>
            <CourseContentList data={data?.courseData} isDemo={true} />
          </div>
          <br />
          <br />
          {/* Course Description */}
          <div className="w-full">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">
              Course Details
            </h1>
            <p className="text-[25px] mt-[20px] whitespace-pre-line w-full overflow-hidden  ">
              {data?.description}
            </p>
          </div>
          <br />
          <br />
          <div className="w-full">
            <div className="800px:flex items-center ">
              <Rating rating={data?.rating} />
              <div className="mb-2 800px:mb[unset] ">
                <h5 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}

                  {` Course Rating ${data?.reviews?.length} Reviews`}
                </h5>
              </div>
              <br />
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div key={index} className="w-full pb-4">
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <div className="w-[50] h-[50px] bg-slate-600  rounded-[50px] flex items-center justify-center cursor-pointer ">
                          <h1 className="uppercase text-[18px] text-black dark:text-white ">
                            {item.user.name.slice(0, 2)}
                          </h1>
                        </div>
                      </div>

                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user.name}
                          </h5>
                          <Rating rating={item.ratings} />
                        </div>
                        <p> {item.comment}</p>

                        <small className="text-[#0000000d1] dark:text-[#ffffff83] ">
                          {format(item.createdAt)}
                        </small>
                      </div>
                      <div className="pl-2 flex 800px:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {item.user.name}
                          <Rating rating={item.rating} />
                        </h5>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-black fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3 ">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {/* {
                  stripePromise&& clientSecret &&(
                    <Elements
                    stripe={stripePromise} options={{clientSecret}}>
                      <CheckOutForm setOpen={setOpen} data={data} />
                    </Elements>
                  )
                } */}

                {
                  stripePromise && clientSecret&&   
                 ( <RazorpayPaymentComponent
                 data={data}
                 user={user}
                />)
                }
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;

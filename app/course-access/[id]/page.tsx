"use client";
import CourseContent from "../../components/Course/CourseContent";
import Loader from "@/app/components/Loader";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params.id;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});
  
  const {user}=useSelector((state:any)=>state.auth)
  // console.log("user in course access",data)

 

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item._id === id
      );

      // console.log(isPurchased)

      // const role=data.user.role

      

      if (!isPurchased) {
        redirect("/");
      }

      if (error) {
        redirect("/");
      }
    }
  }, [data, error,user]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id}  user={data?.user}/>
        </div>
      )}
    </>
  );
};

export default Page;

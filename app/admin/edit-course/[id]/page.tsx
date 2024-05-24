"use client";

import React from "react";
import AdminSideBar from "../../../components/Admin/sidebar/AdminSideBar";
import Heading from "../../../../app/utils/Heading";
import CreateCourse from "../../../components/Admin/Course/CreateCourse";
import DashboardHeader from "../../../../app/components/Admin/DashboardHeader";
import EditCourse from '../../../components/Admin/Course/EditCourse'


type Props = {};

const page = ({params}:any) => {
    const id =params?.id
  return (
    <div>
      <Heading
        title="WisdomKart -Admin"
        description="Wisdomkart is one stop learning platform for business professionals"
        keywords="Lean Six sigma"
      />

      <div className="flex">
        <div className="1500px:w-[16p%]  w-1/5 ">
          <AdminSideBar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          {/* <CreateCourse /> */}
          <EditCourse id={id}  />
        </div>
      </div>
    </div>
  );
};

export default page;

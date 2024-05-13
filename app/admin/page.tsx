"use client";

import React from "react";
import Heading from "../utils/Heading";
import AdminSideBar from "../components/Admin/sidebar/AdminSideBar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from '../components/Admin/DashboardHero'
type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="WisdomKart -Admin"
          description="WisdomKart is a platform to upskill from courses mentored by Professionals"
          keywords="Lean Six Sigma"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w[16%] w-1/5">
            <AdminSideBar />
          </div>
          <div className="w-[85%] ">
            <DashboardHero/>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;

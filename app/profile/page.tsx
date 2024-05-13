'use client'

import Heading from "@/app/utils/Heading";
import Protected from "../hooks/useProtected";
import React, { FC, useState } from "react";
import Header from "../components/Header";
import Profile from '../components/Profile/Profile'
import { useSelector } from "react-redux";
type Props = {};

const Page: FC<Props> = (props) => {

    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route,setRoute]=useState("Login")
    const {user}= useSelector((state:any)=>state.auth)
  
  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name} profile - WisdomKart`}
          description="Get courses to learn from industry expert with tons of experience"
          keywords="Lean,Six Sigma,Inventory Management"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user}/>
      </Protected>
    </div>
  );
};

export default Page;

"use client";
import React, { FC, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ChangePassword from './ChangePassword'
import PurchasedCourses from './PurchasedCourses'

import ProfileInfo from "./ProfileInfo";
type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const logOutHandler = async () => {
    // console.log("Logout handler called")
    setLogout(true);

    

    // to remove session which is part of social auth
    // await signOut();
    
  };


  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[85%] flex mx-auto  ">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900  bg-opacity-90 border border-solid border-black  bg-white dark:border-[#fffff1d] border-[#ffffff00] rounded-[5px] dark:shadow-sm  shadow-xl mt-[80px] mb-[800px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        }left-[30px] `}
      >
        <SidebarProfile
          user={user}
          active={active} 
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && <ProfileInfo user={user} avatar={avatar} />}
      {active === 2 && <ChangePassword  />}
      {active===3 && <PurchasedCourses/> }
    </div>
  );
};

export default Profile;

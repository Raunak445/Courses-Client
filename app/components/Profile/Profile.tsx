"use client";
import React, { FC, useEffect, useState } from "react";
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

  // Use the logout query and check its status
  const { data, error, isLoading } = useLogOutQuery(undefined, {
    skip: !logout, // Skip until logout is triggered
  });

  useEffect(() => {
    // Perform actions when logout is triggered
    if (logout) {
      console.log("Logout process initiated");

      // Call the signOut function from next-auth to clear session
      signOut();

      // Optional: redirect to home or login page after logout
      // window.location.href = "/login"; // or any route you want to redirect to after logout

      // Reset the logout state
      setLogout(false);
    }
  }, [logout]);

  // Event listener for scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logOutHandler = () => {
    // Initiate the logout process
    setLogout(true);
  };

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border border-solid border-black bg-white dark:border-[#fffff1d] border-[#ffffff00] rounded-[5px] dark:shadow-sm shadow-xl mt-[80px] mb-[800px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
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
      {active === 2 && <ChangePassword />}
      {active === 3 && <PurchasedCourses />}
    </div>
  );
};

export default Profile;

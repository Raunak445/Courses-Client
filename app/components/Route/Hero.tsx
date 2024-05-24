// import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
// import React from "react";

// type Props = {};

// const Hero = (props: Props) => {
//   const { data } = useGetHeroDataQuery("Banner", {});
//   return (
//     <div>
//       <div className="w-full 1000px:flex items-center">
//         <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50px] w-[50vh] hero_animation rounded-full  ">
//           <img
//             src={data?.layout?.banner?.image?.url}
//             width={400}
//             height={400}
//             alt=""
//             className="object contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]  "
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import React from "react";

const Hero = () => {
  const { data } = useGetHeroDataQuery("Banner", {});

  return (
    <div className="flex justify-between items-center h-[80vh]  text-black  bg-yellow-200 hover:bg-yellow-300 ">
      {/* Image on the left */}
      <div className="flex items-center">
        <div className="relative h-[400px] w-[400px] ">
          <img
            src={data?.layout?.banner?.image?.url}
            // width={300}
            // height={300}
            alt=""
            className="object-cover   800px:ml-[10px] rounded-full 800px:w-[80vw] 800px:h-[75vh] w-[60vw] h-[60vh]"
          />
        </div>
      </div>

      {/* Text and Search bar on the right */}
      <div className="flex flex-col justify-center w-1/2 sm:flex-row ">
        {/* Message */}
        <h1 className="800px:text-4xl font-bold text-center 800px:absolute top-[30%]  ">
          {/* Improve your online learning experience with us */}
          {data?.layout?.banner?.title}
        </h1>

        {/* Search bar */}
        <div className=" flex flex-col items-center justify-end mr-[20%] mt-[10%]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Search courses"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full sm:w-[70%] dark:text-white"
            />
            <button className="w-full sm:w-auto ml-0 sm:ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Search
            </button>
          </div>
          <div className="mt-4 md:mt-[30px]">
            {data?.layout?.banner?.subTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

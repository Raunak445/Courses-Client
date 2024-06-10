import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import avatarIcon from "../../../public/Image/avatar.jpg";
import Image from "next/image";
type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
}: Props) => {
  // console.log("reaced in media");

  const [activeBar, setActiveBar] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div className="w-[95%] 800px:w-[86%] py-6 m-auto dark:text-white text-black h-screen ">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />

      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "cursor-no-drop opacity-[.8]"
          } `}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>

        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "cursor-no-drop opacity-[.8]"
          } `}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowRight className="mr-2" />
          Next Lesson
        </div>
      </div>

      <h1 className="pt-2 text-[25px] font-[600]">{data[activeVideo].title}</h1>
      <br />

      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer  ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
          <br />
          <br />
        </p>
      )}

      {activeBar === 1 && (
        <div className="min-h-20">
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5 dark:text-white text-black" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block">
                {item.title && item.title + " :"}
                {item.url && item.url}
              </h2>
              <br />
              <br />
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              scr={
                user?.avatar || avatar ? user.avatar.url || avatar : avatarIcon
              }
              width={50}
              height={50}
              alt="rounded-full"
            />
            <textarea
            name=''
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            id=''
            cols={40}
            rows={5}
            placeholder="Write your question..."
            className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full  p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            />
          </div>
        </>
      )}

      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContentMedia;

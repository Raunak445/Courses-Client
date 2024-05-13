import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { MdOutbond, MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSession, setActiveSession] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle=(index:number)=>{
    const updatedCollapsed=[...isCollapsed];
    updatedCollapsed[index]=updatedCollapsed[index]
    setIsCollapsed(updatedCollapsed)
  }

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
            

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                } `}
              >

                {
                    showSectionInput &&(
                        <>
                        <div>
                       <input type="text" 
                       className={`text-[20px] ${item.videoSection==="Untitled Section"?"w-[170px]":"w-min"  } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none `}

                       onChange={(e)=>{
                        const updatedData=[...courseContentData]
                        updatedData[index].videoSection=e.target.value
                        setCourseContentData(updatedData)
                       }}
                       /> 
                       <BsPencil className="cursor-pointer dark:text-white text-black"/>

                       </div>
                       <br />
                        </>
                    )
                }


                <div className="flex w-full items-center justify-between my-0">


                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* arrow button for collapsed video content */}

                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      } `}

                      onClick={()=>{
                        const updatedData=[...courseContentData];
                        updatedData.splice(index,1);
                        setCourseContentData(updatedData)
                      }}
                    />

                      <MdOutlineKeyboardArrowDown
                      fontSize='large'
                      className="dark:text-white text-black"
                      style={{
                        transform:isCollapsed[index]?"rotate(180deg)":"rotate(0deg)"
                      }}
                      onClick={()=>handleCollapseToggle(index)}
                      />

                  </div>
                </div>
                {
                    !isCollapsed[index]&&(
                        <>
                        <div className="my-3">
                        <label className={`${styles.label}`}> Video Title</label>
                       
                        </div>
                        </>
                    )
                }
              </div>
            </>
          );
        })}
      </form>
    </div>
  );
};

export default CourseContent;

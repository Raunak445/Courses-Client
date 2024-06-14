"use client";
import React, { FC, useState } from "react";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {

    e.preventDefault();

    if(courseInfo.thumbnail===''){
      toast.error("Please provide thumbnail for course")
      return ;
      
    }

    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handlerDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTrasfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 ">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Course Name</label>

          <input
            type="name"
            name=""
            required
            value={courseInfo?.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="Please write the name of your course"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write the complete description for course so that it help the mentees decide whether they should by this course or not."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) => {
              setCourseInfo({ ...courseInfo, description: e.target.value });
            }}
          />
            {" "}
          {/* </textarea> */}
          <br />

          <div className="w-full flex justify-between ">
            <div className="w-[45%]">
              <label className={`${styles.label}`}>Course Price(in INR)</label>
              <input
                type="number"
                name=""
                min={0}
                required
                value={courseInfo?.price}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, price: e.target.value })
                }
                id="price"
                placeholder="Price of your course"
                className={`${styles.input}`}
              />
            </div>
            <div className="w-[45%]">
              <label className={`${styles.label}`}>
                Estimated Price (in INR)(optional)
              </label>
              <input
                type="number"
                name=""
                min={0}
               
                value={courseInfo?.estimatedPrice}
                onChange={(e: any) =>
                  setCourseInfo({
                    ...courseInfo,
                    estimatedPrice: e.target.value,
                  })
                }
                id="price"
                placeholder="Estimated Price"
                className={`${styles.input}`}
              />
            </div>
          </div>
          <br />
          <div>
            <label className={`${styles.label}`} htmlFor="email">
              Course Tags
            </label>
            <input
              type="text"
              required
              name=""
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="Lean,Six Sigma"
              className={`${styles.input}`}
            />
          </div>
          <br />
          <div className="w-full flex justify-between ">
            <div className="w-[45%]">
              <label className={`${styles.label}`}>Course Level</label>
              <input
                type="text"
                name=""
                required
                value={courseInfo?.level}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, level: e.target.value })
                }
                id="level"
                placeholder="Beginner/Intermediate/Expert"
                className={`${styles.input}`}
              />
            </div>
            <div className="w-[50%]">
              <label className={`${styles.label} `}>Demo Url</label>
              <input
                type="text"
                name=""
                required
                value={courseInfo?.demoUrl}
                onChange={(e: any) =>
                  setCourseInfo({
                    ...courseInfo,
                    demoUrl: e.target.value,
                  })
                }
                id="demoUrl"
                placeholder="eer4f43  "
                className={`${styles.input} `}
              />
            </div>
          </div>
          <br />
          <div className="w-full">
            <input
              type="file"
              accept="image/*"
             
              name=""
              id="file"
              className={`hidden`}
              onChange={handleFileChange}
            />
          </div>
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-black p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragLeave={handlerDragLeave}
            onDragOver={handleDragOver}
            onDrag={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180ox] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;

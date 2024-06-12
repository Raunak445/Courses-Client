'use client'

import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  // Handler to update benefits
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  // Handler to update prerequisites
  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index] = { ...updatedPrerequisites[index], title: value };
    setPrerequisites(updatedPrerequisites);
  };

  // Handler to add a new benefit
  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  // Handler to add a new prerequisite
  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  // Handler to delete a benefit
  const handleDeleteBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };

  // Handler to delete a prerequisite
  const handleDeletePrerequisites = (index: number) => {
    const updatedPrerequisites = prerequisites.filter((_, i) => i !== index);
    setPrerequisites(updatedPrerequisites);
  };

  // Navigation handlers
  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields to go to next section");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the benefits for students in this course?
        </label>

        <br />

        {benefits.map((benefit: any, index: number) => (
          <div key={index} className="flex items-center my-2">
            <input
              type="text"
              name="Benefit"
              placeholder="Please write the benefits of taking this course"
              required
              className={`${styles.input} flex-grow`}
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
            {index > 0 && (
              <DeleteIcon
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={() => handleDeleteBenefit(index)}
                className="text-red-500 hover:text-red-700"
              />
            )}
          </div>
        ))}

        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
          className="dark:text-white text-black"
        />
      </div>

      <div>
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the prerequisites for starting this course?
        </label>

        <br />

        {prerequisites.map((prerequisite: any, index: number) => (
          <div key={index} className="flex items-center my-2">
            <input
              type="text"
              name="Prerequisites"
              placeholder="What are the prerequisites for taking this course"
              required
              className={`${styles.input} flex-grow`}
              value={prerequisite.title}
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            />
            {index > 0 && (
              <DeleteIcon
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={() => handleDeletePrerequisites(index)}
                className="text-red-500 hover:text-red-700"
              />
            )}
          </div>
        ))}

        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
          className="dark:text-white text-black"
        />
      </div>

      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center rounded mt-8 cursor-pointer"
          onClick={prevButton}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center rounded mt-8 cursor-pointer"
          onClick={handleOptions}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;

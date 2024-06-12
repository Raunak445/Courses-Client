import { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCourseQuery } from "@/redux/features/courses/coursesApi";
import { useSelector } from "react-redux";

type Props = {};

const PurchasedCourses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCourseQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    
    if(data?.courses && user?.courses){
      const purchasedCoureIds=user.courses.map((course)=>course._id);
      const filteredCourses=data.courses.filter((course)=>purchasedCoureIds.includes(course._id))
      setCourses(filteredCourses);

    }

    // setCourses(data?.courses);
    
  }, [data,user]);



  return (
    <div>
    <div className={`w-[90%] 800px:w-[80%] m-auto  `}>
      <h1 className="text-center font-Poppins 800px:text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-black font-[700] tracking-tight">
        <span className="text-gradient">Purchased Courses </span> <br />
    
      </h1>
      <br />
      <br />
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2  md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0 ">
      {
        courses && 
        courses.map((item:any,index:number)=>(
          <CourseCard
            item={item}
            key={index}
          />
        ))
      }

      </div>

    </div>
  </div>
  )
};

export default PurchasedCourses;

import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi'
import React, { useState } from 'react'
import Loader from '../Loader'
import Heading from '@/app/utils/Heading'
import CourseContentMedia from './CourseContentMedia'

type Props = {
    id:string
}

const CourseContent = ({id}: Props) => {

    const {data:contentData,isLoading}=useGetCourseContentQuery(id)
    const data=contentData?.content;

    const [activeVideo,setActiveVideo]=useState(0);


  return (
    <>
    {
        isLoading?(<Loader/>):(
        <div className='w-full grid 800px:grid-cols-10'>
        <Heading
        title={data[activeVideo]?.title}
        description='filler text'
        keywords={data[activeVideo]?.tags}

        />
        <div className='col-span-7'>
            <CourseContentMedia
            data={data}
            // setData={setData}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            id={id}
            />
        </div>
        </div>)
    }
    </>
  )
}

export default CourseContent
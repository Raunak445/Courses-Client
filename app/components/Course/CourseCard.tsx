import Rating from '@/app/utils/Rating'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'

type Props = {
    item:any,
    isProfile?:boolean
}

const CourseCard:FC<Props> = ({item,isProfile}) => {
  return (
    <Link href={!isProfile ?`/course/${item._id}`:`course-access/${item._id}`}>

        <div className='w-full min-h-[35vh] dark:bh-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] darl:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner'>
        <Image src={item.thumbnail.url} width={500} height={300} objectFit='contain' className='rounded w-full'  alt="" /> 
        <br />
        <h1>
           {item.name} 
        </h1>
        <div className='w-full flex items-center justify-between pt-2'>
            <Rating rating={item.ratings}/>
            <h5 className={`text-black dark:text-white ${isProfile && "hidden 800px:inline"}`}>
            {item.purchased} Students
            </h5>
        </div>
            <div className='w-full flex items-center justify-between pt-2'>
            <div className='flex'>
                <h3 className='text-black dark:text-white'>
                    {item.price ===0? "Free":item.price +"INR"}
                </h3>
                <h5 className='pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-white'>
                {item.estimatedPrice} INR
                </h5>


            </div>

            <div className='flex items-center pb-3'>
                <AiOutlineUnorderedList
                size={20}
                fill='#fff'
                />
                <h5 className='pl-2 text-black dark:text-white'>
                {item.courseData?.length} Lectures
                </h5>

            </div>


            </div>

            </div> 

        </Link>
  )
}

export default CourseCard
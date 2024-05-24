'use client'

import DashboardHero from '../../../app/components/Admin/DashboardHero'
import AdminSideBar from '../../../app/components/Admin/sidebar/AdminSideBar'
import AdminProtected from '../../../app/hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import AllCourses from '../../components/Admin/Course/AllCourse'
import React from 'react'
import EditHero from '../../components/Admin/Customization/EditHero'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="WisdomKart -Admin"
          description="WisdomKart is a platform to upskill from courses mentored by Professionals"
          keywords="Lean Six Sigma"
        />
        <div className="flex h-screen">
          <div className="1500px:w[16%] w-1/5">
            <AdminSideBar />
          </div>
          <div className="w-[85%] ">
            <DashboardHero/>
            <EditHero/>
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default page
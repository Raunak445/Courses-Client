
import { apiSlice } from "../api/apiSlice";



export const courseApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createCourse:builder.mutation({
            query:({data})=>({
                url:'create-course',
                method:'POST',
                body:{data},
                credentials:'include' as const,
            })
        }),
        getAllCourses:builder.query({
            query:()=>({
                url:'get-admin-courses',
                method:'GET',
                credentials:'include' as const,
            })
        }),
        deleteCourses: builder.mutation({
            query: (id) => ({
              url: `delete-course/${id}`,
              method: "DELETE",
              body:id,
              credentials: "include" as const,
            }),
          }),
          editCourse: builder.mutation({
            query: ({id,data}) => ({
              url: `edit-course/${id}`,
              method: "PUT",
              body:data,
              credentials: "include" as const,
            }),
          }),
          getUsersAllCourse: builder.query({
            query: () => ({
              url: `get-courses`,
              method: "GET",
              credentials: "include" as const,
            }),
          }),
          getCourseDetails: builder.query({
            query: (id) => ({
              url: `get-course/${id}`,
              method: "GET",
              credentials: "include" as const,
            }),
          }),
          getCourseContent: builder.query({
            query: (id) => ({
              url: `get-course-content/${id}`,
              method: "GET",
              credentials: "include" as const,
            }),
          }),
       
    })
   

})


export const {useCreateCourseMutation,useGetAllCoursesQuery,useDeleteCoursesMutation,useEditCourseMutation,useGetUsersAllCourseQuery,useGetCourseDetailsQuery,useGetCourseContentQuery  }=courseApi
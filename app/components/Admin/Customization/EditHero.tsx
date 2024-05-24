import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  

  const { data,refetch } = useGetHeroDataQuery("Banner", {
   refetchOnMountOrArgChange:true
  });

  const [editLayout,{isSuccess,error,isLoading}]=useEditLayoutMutation({})

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }

    if(isSuccess){
      toast.success('Hero Section Updated Successfully')
        refetch()
    }

    if(error){
      if("data" in error){
        const errorMessage=error as any;
        toast.error(errorMessage?.data?.message)
      }
    }

  }, [data,isSuccess,error]);

  const handleUpdate=(e:any)=>{
    const file=e.target.files?.[0]

    if(file){
      const reader=new FileReader();
      reader.onload=(e:any)=>{
        if(reader.readyState===2){
          setImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }

  }

  const handleEdit=async()=>{
    await editLayout({
      type:"Banner",
      image,
      title,
      subTitle,
    })
  }


  return (
    <>
      <div className="w-full 1000px:flex items-center dark:text-white text-black">

        {/* i have removed hero_animation from here */}
        <div
          className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px]
        1100px:w-[500px] h-[50vh] w-[50vw]  rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem] "
        ></div>

        <div className="1000px:w-[40%] flex 1000px:min-h-screen  items-center justify-end pt-[70px] 1000px:pt-[0] z-10  ">
          <div className="relative flex items-center justify-end ">
            
            <img
              src={image}
              alt=""
              className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10] "
            />

            <input
              type="file" 
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />

            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
              <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
            </label>
          </div>
        </div>
        <div className="absolute bottom-10 right-10">
        <button onClick={()=>handleEdit()} 
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
        </div>
      </div>
    </>
  );
};

export default EditHero;






// import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
// import React, { FC, useEffect, useState } from "react";
// import { AiOutlineCamera } from "react-icons/ai";

// type Props = {};

// const EditHero: FC<Props> = () => {
//   const [image, setImage] = useState("");
//   const [title, setTitle] = useState("");
//   const [subTitle, setSubTitle] = useState("");

//   const { data } = useGetHeroDataQuery("Banner", {
//     refetchOnMountOrArgChange: true,
//   });

//   useEffect(() => {
//     if (data) {
//       setTitle(data?.layout?.banner.title);
//       setSubTitle(data?.layout?.banner.subTitle);
//       setImage(data?.layout?.banner?.image?.url);
//     }
//   }, [data]);

//   const handleUpdate = (e: any) => {};

//   return (
//     <>
//       <div className="w-full flex items-center relative dark:text-white text-black">
//         {/* Circle container */}
//         <div className="absolute top-[100px] bottom-0 left-0 right-0 flex items-center justify-center w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full overflow-hidden bg-gray-200">
//           {/* Image */}
//           <img
//             src={image}
//             alt=""
//             className="object-cover w-full h-full"
//           />
//           {/* Camera icon */}
//           <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
//             <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
//           </label>
//           {/* File input */}
//           <input
//             type="file"
//             name=""
//             id="banner"
//             accept="image/*"
//             onChange={handleUpdate}
//             className="hidden"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditHero;


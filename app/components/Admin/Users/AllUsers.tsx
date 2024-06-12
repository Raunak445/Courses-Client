"use client";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { FiEdit2 } from "react-icons/fi";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "../../../../app/styles/style";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";


type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const { isLoading, data, refetch,isError:dataFetchError } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteUser, { isSuccess, error }] = useDeleteUserMutation({});

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateUserRole,{isSuccess:updateSuccess,error:updateError}]=useUpdateUserRoleMutation()
  const [email,setEmail]=useState("")
  const [role,setRole]=useState("admin")

  useEffect(() => {
    if(dataFetchError){
      redirect('/')
    }
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("User deleted Successfully");
      
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      
       
      }
    }
  }, [isSuccess, error,dataFetchError]);



  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <a href={`mailto:${params.row.email}`}>
                <AiOutlineMail
                  className="dark:text-white text-black"
                  size={20}
                />
              </a>
            </Button>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role !== "ad");

    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }


  useEffect(()=>{

    if(updateError){
     if("data" in updateError){
      const errorMessage=updateError as any;
      toast.error(errorMessage.data.message)
      
     }
    }

    if(updateSuccess){
      toast.success("User role updated Successfully");
      setActive(false);
      refetch();
    }

  },[updateError,updateSuccess])

  const handleSubmit=async()=>{
    console.log("r",role)


      await updateUserRole({email,role})
    

  }

  // console.log("active", active);

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="w-full flex justify-end">
              <div
                className={` ${styles.button} !w-[200px]`}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </div>
            </div>
          )}
          <Box
            m="40px 0 0"
            height="80vh"
            sx={{
              "& .MultiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect_icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },

              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },

              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC", // Corrected color value
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "white",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>

          {open && (
            <Modal
              open={open}
              onClose={() => setActive(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%]  left-[50%] -translate-x-1/2 -translate-y-1/2  bg-[#3e4396] p-[20px] rounded-[20px] ">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this user?
                </h1>

                <div className="flex w-full items-center justify-between mb-6">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3] `}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>

                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-red `}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}

          {active && (
            <Modal
              open={active}
              onClose={() => setOpen(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%]  left-[50%] -translate-x-1/2 -translate-y-1/2  bg-[#3e4396] p-[20px] rounded-[20px] ">
                <h1 className={`${styles.title}`}>Add New Member</h1>
                <div className="mt-4">
                  <input
                    type="email"
                    value={email}
                    placeholder="Enter email..."
                    className={`${styles.input}`}
                    onChange={(e)=>setEmail(e.target.value)}
                  />

                  <select name="" id="" className={`${styles.input} !mt-6`}
                  value={role}
                  onChange={(e)=>setRole(e.target.value)}
                  >
                    <option value="admin" className="text-black bg-blue-100">Admin</option>
                    <option value="user" className="text-black bg-blue-100">User</option>
                  </select>
                  <br />
                  <div className={`${styles.button} my-6 !h-[30px]`}
                  onClick={()=>handleSubmit()}
                  >
                    Submit
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;

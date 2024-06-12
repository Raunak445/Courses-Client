import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);

  if(!user){
    redirect('/')
  
  }

  console.log(user);

  if (user) {
    const isAdmin = user?.role === "admin";
    // console.log("isAdmin",isAdmin)
    return isAdmin ? children : redirect("/");
  }
}

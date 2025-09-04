import { Outlet } from "react-router";
import Sidebar from "../Admin/Sidebar";
import Navbar from "../Admin/Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className=" grid grid-cols-12 ">
        <div className=" h-[calc(100vh-50px)] col-span-2 ">
          <Sidebar />
        </div>
        <div className="col-span-10 h-[calc(100vh-50px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

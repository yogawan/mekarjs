import React from "react";
import DashboardOverview from "@/components/overview/DashboardOverview";
import AssistantAI from "@/components/chat/AssistantAI";
import Sidebar from "@/components/company/Sidebar";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

const DashboardPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Sidebar />
      <div className="ml-[256px] w-[550px] p-5">
          <DashboardOverview />
      </div>
      <div className="fixed top-0 right-0 p-5 h-screen overflow-scroll">
        <AssistantAI />
        <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Logout
      </button>

      </div>
    </div>

  )
}

export default DashboardPage;
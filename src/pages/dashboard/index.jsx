import React from "react";
import DashboardOverview from "@/components/overview/DashboardOverview";
import AssistantAI from "@/components/chat/AssistantAI";
import Sidebar from "@/components/global/Sidebar";
import useAuth from "@/hooks/useAuth";

const DashboardPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

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

      </div>
    </div>

  )
}

export default DashboardPage;
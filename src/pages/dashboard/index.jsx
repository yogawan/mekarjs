import { useEffect, useState } from "react";
import axios from "axios";

// import { 
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
// } from "recharts";

import { Icon } from "@iconify/react";
import ChatAIOrganism from "@/components/organisms/ChatAIOrganism";
import SidebarOrganism from "@/components/organisms/SidebarOrganism";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4560"];

const Dashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expenseRes, summaryRes] = await Promise.all([
          axios.get("/api/dummy/incomes"),
          axios.get("/api/dummy/expenses"),
          axios.get("/api/dummy/summary"),
        ]);

        setIncomes(incomeRes.data);
        setExpenses(expenseRes.data);
        setSummary(summaryRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const chartData = incomes.map((income, index) => ({
  //   date: income.date,
  //   income: income.total_amount,
  //   expense: expenses[index]?.amount || 0,
  // }));

  return (
    <div>
      <SidebarOrganism />
      <div className="flex ml-52 mt-5">
        <div className="w-[50%] bg-background text-black">
          <div className="mb-2">
            <p>Hi! Yogawan.</p>
          </div>
          {summary && (
            <div>
              <div className="mb-5 flex items-center">
                <p className="text-5xl">Rp {summary.net_profit.toLocaleString()},00</p>
                <div className="ml-2 flex p-2 border border-black/15 rounded-full h-fit w-fit justify-between items-center">
                  <p className="text-[8px] font-bold">{summary.total_income.toLocaleString()}</p>
                  <Icon icon="bxs:up-arrow" width="10" height="10" className="text-green-500 ml-2" />
                </div>
                <div className="ml-2 flex p-2 border border-black/15 rounded-full h-fit w-fit justify-between items-center">
                  <p className="text-[8px] font-bold">{summary.total_expense.toLocaleString()}</p>
                  <Icon icon="bxs:down-arrow" width="10" height="10" className="text-red-500 ml-2" />
                </div>
              </div>

              <div className="flex justify-left">
                <div className="bg-black/1 rounded-3xl mr-5 p-5 w-[400px] h-[100px] flex flex-col justify-between items-start">
                  <Icon icon="tabler:chart-line" width="24" height="24" className="text-black" />
                  <div className="flex w-full justify-between items-center">
                    <p className="text-xs font-bold">Rp {summary.total_income.toLocaleString()}</p>
                    <Icon icon="bxs:up-arrow" width="16" height="16" className="text-green-500" />
                  </div>
                </div>

                <div className="bg-black/1 rounded-3xl mr-5 p-5 w-[400px] h-[100px] flex flex-col justify-between items-start">
                  <Icon icon="tabler:chart-line" width="24" height="24" className="text-black" />
                  <div className="flex w-full justify-between items-center">
                    <p className="text-xs font-bold">Rp {summary.total_expense.toLocaleString()}</p>
                    <Icon icon="bxs:down-arrow" width="16" height="16" className="text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-[50%] bg-background text-black">
          <ChatAIOrganism />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

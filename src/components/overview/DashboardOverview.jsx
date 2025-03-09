import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import OverviewHeader from "./OverviewHeader";
import OverviewNetProfit from "./OverviewNetProfit";
import OverviewStats from "./OverviewStats";

const DashboardOverview = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/utilities/summary");
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };
    fetchData();
  }, []);

  const formattedSummary = useMemo(() => {
    if (!summary) return null;
    return {
      net_profit: summary.net_profit.toLocaleString(),
      total_income: summary.total_income.toLocaleString(),
      total_expense: summary.total_expense.toLocaleString(),
      total_purchases: summary.total_purchases.toLocaleString(),
      total_sales: summary.total_sales.toLocaleString(),
      inventory_value: summary.inventory_value.toLocaleString(),
      employee_salaries: summary.employee_salaries.toLocaleString(),
      production_cost: summary.production_cost.toLocaleString(),
      supplier_count: summary.supplier_count,
      customer_count: summary.customer_count,
    };
  }, [summary]);

  return (
    <div>
      <OverviewHeader />
      <OverviewNetProfit background={"bg-black"} color={"text-white"} height={"h-[256px]"} summary={summary} />
      <OverviewNetProfit background={"bg-black/5"} color={"text-black"} height={"h-[200px]"} summary={summary} />
      <OverviewStats summary={summary} />
    </div>
  );
};

export default DashboardOverview;

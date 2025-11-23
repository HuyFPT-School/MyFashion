import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import {
  getTotalSales,
  getTotalCustomers,
  getSalesPerDay,
  getSalesPerWeek,
  getSalesPerMonth,
  calculateProfit,
} from "@/lib/action/action";

export default async function Page() {
  const { totalOrders, totalRevenue } = await getTotalSales();
  const totalCustomers = await getTotalCustomers();
  const totalProfit = await calculateProfit()
  // Fetch data cho cả 3 views
  const dailyData = await getSalesPerDay();
  const weeklyData = await getSalesPerWeek();
  const monthlyData = await getSalesPerMonth();
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards
            totalRevenue={totalRevenue}
            totalOrders={totalOrders}
            totalCustomers={totalCustomers}
            totalProfit={totalProfit}
          />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive
              dailyData={dailyData}
              weeklyData={weeklyData}
              monthlyData={monthlyData}
            />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}

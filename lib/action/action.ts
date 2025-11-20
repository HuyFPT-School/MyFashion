import Customer from "../models/customer";
import Order from "../models/order";
import connectToDB from "../mongoDB";

export const getTotalSales = async () => {
  await connectToDB();
  const orders = await Order.find();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );
  return { totalOrders, totalRevenue };
};

export const getTotalCustomers = async () => {
  await connectToDB();
  const customers = await Customer.find();
  const totalCustomers = customers.length;
  return totalCustomers;
};

export const getSalesPerDay = async () => {
  await connectToDB();
  const orders = await Order.find().sort({ createdAt: "desc" });

  const salesPerDay: { [key: string]: number } = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    salesPerDay[date] = (salesPerDay[date] || 0) + order.totalAmount;
  });

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }).reverse();

  const graphData = last30Days.map((date) => ({
    name: date,
    sales: salesPerDay[date] || 0,
  }));

  return graphData;
};

export const getSalesPerWeek = async () => {
  await connectToDB();
  const orders = await Order.find().sort({ createdAt: "desc" });

  const salesPerWeek: { [key: number]: number } = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const weekNumber = getWeekNumber(date);
    salesPerWeek[weekNumber] = (salesPerWeek[weekNumber] || 0) + order.totalAmount;
  });

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const weekNum = getCurrentWeek() - i;
    return {
      name: `Week ${weekNum}`,
      sales: salesPerWeek[weekNum] || 0,
    };
  }).reverse();

  return graphData;
};

export const getSalesPerMonth = async () => {
  await connectToDB();
  const orders = await Order.find();

  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth();
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    return acc;
  }, {} as { [key: number]: number });

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(0, i)
    );
    return { name: month, sales: salesPerMonth[i] || 0 };
  });

  return graphData;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString("de-DE");
};

function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getCurrentWeek(): number {
  return getWeekNumber(new Date());
}
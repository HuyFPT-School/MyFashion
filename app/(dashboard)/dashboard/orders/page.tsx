"use client";
import { DataTable } from "@/components/custom ui/dataTable";
import Loader from "@/components/custom ui/loading";
import { columns } from "@/components/orders/orderColumn";
import { Separator } from "@radix-ui/react-separator";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const getOrder = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/order", {
        method: "GET",
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  console.log(orders)
  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-2xl font-bold">Order</p>
      <Separator className="bg-grey-100 my-5" />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  );
};

export default Order;

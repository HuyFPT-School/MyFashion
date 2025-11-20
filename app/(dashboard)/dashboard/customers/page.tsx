"use client";
import { DataTable } from "@/components/custom ui/dataTable";
import Loader from "@/components/custom ui/loading";
import { columns } from "@/components/customers/customerColumns";
import React, { useEffect, useState } from "react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCustomers = async () => {
    try {
      const res = await fetch("/api/customers", { method: "GET" });
      const data = await res.json();
      setCustomers(data);
      setLoading(false);
    } catch (err) {
      console.log("[customers_GET]", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-2xl font-bold">Customers</p>
      <DataTable columns={columns} data={customers} searchKey="name" />
    </div>
  );
};

export default Customers;

"use client";
import { DataTable } from "@/components/custom ui/dataTable";
import Loader from "@/components/custom ui/loading";
import { columns } from "@/components/orderItems/orderItemsColumn";
import { useEffect, useState } from "react";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orderDetail, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const getOrderDetails = async () => {
    const { orderId } = await params;
    try {
      const res = await fetch(`/api/order/${orderId}`, {
        method: "GET",
      });
      const data = await res.json();
      setOrderDetails(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrderDetails();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-8 p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
          {orderDetail?.orderDetails?.paymentStatus }
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Order Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-base font-medium">
              {orderDetail?.orderDetails?._id}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Customer Name</p>
            <p className="text-base font-medium">
              {orderDetail?.customer?.name || "N/A"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Shipping Address</p>
            <p className="text-base font-medium">
              {orderDetail?.orderDetails?.shippingAddress || "N/A"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Contact Number</p>
            <p className="text-base font-medium">
              {orderDetail?.orderDetails?.shippingRate || "N/A"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Payment Method</p>
            <p className="text-base font-medium uppercase">
              {orderDetail?.orderDetails?.paymentMethod || "N/A"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-bold text-green-600">
              ${orderDetail?.orderDetails?.totalAmount}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <DataTable
          columns={columns}
          data={orderDetail?.orderDetails?.products || []}
          searchKey="product"
        />
      </div>
    </div>
  );
};
export default OrderDetails;

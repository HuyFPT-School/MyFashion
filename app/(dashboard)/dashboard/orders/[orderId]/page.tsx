"use client";
import Loader from "@/components/custom ui/loading";
import { useEffect, useState } from "react";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orderDetail, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const getOrderDetails = async () => {
    const {orderId} = await params;
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
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base font-bold">
        Order ID:
        <span className="text-base font-medium">
          {orderDetail?.orderDetails?._id}
        </span>
      </p>
      <p className="text-base font-bold">
        Customer name:
        <span className="text-base font-medium">
          {orderDetail?.customer?.name}
        </span>
      </p>
      <p className="text-base font-bold">
        Shipping Address:
        <span className="text-base font-medium">
          {orderDetail?.orderDetails?.shippingAddress}
        </span>
      </p>
      <p className="text-base font-bold">
        Total paid:
        <span className="text-base font-medium">
          ${orderDetail?.orderDetails?.totalAmount}
        </span>
      </p>
      <p className="text-base font-bold">
        Shipping Rate ID:
        <span className="text-base font-medium">
          {orderDetail?.orderDetails?.shippingRate}
        </span>
      </p>
    </div>
  );
};
export default OrderDetails;

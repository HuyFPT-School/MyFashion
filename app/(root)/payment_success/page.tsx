"use client";

import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";

const PaymentSuccessContent = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useUser();
  const searchParams = useSearchParams();
  const [orderCreated, setOrderCreated] = useState(false);

  const paymentMethod = useMemo(
    () => searchParams.get("method") ?? "momo",
    [searchParams]
  );

  useEffect(() => {
    const createOrder = async () => {
      if (orderCreated || !user || cartItems.length === 0) return;

      try {
        const total = cartItems.reduce(
          (sum, item) => sum + item.item.price * item.quantity,
          0
        );

        const customerData = localStorage.getItem("checkoutCustomer");
        const customer = customerData
          ? JSON.parse(customerData)
          : {
              clerkId: user.id,
              email: user.emailAddresses[0].emailAddress,
              name: user.fullName,
              phone: "",
              address: "",
            };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems,
            customer,
            totalAmount: total,
            shippingAddress: customer.address,
            paymentMethod,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const newOrderId = data.orderId;
          console.log("Order created:", newOrderId);

          const customerRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/customers`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                clerkId: customer.clerkId,
                name: customer.name,
                email: customer.email,
                orderId: newOrderId,
              }),
            }
          );

          if (!customerRes.ok) {
            console.error("Failed to update customer");
          }

          setOrderCreated(true);
          clearCart();
          localStorage.removeItem("checkoutCustomer");
        } else {
          console.error("Failed to create order");
        }
      } catch (err) {
        console.error("[createOrder]", err);
      }
    };

    createOrder();
  }, [cartItems, clearCart, user, orderCreated, paymentMethod]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 px-4 text-center">
      <div className="relative">
        <span className="absolute inline-flex h-20 w-20 rounded-full bg-green-400/50 animate-ping" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg">
          <svg
            className="h-10 w-10 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      <p className="text-xl font-bold text-green-600">Successful Payment</p>
      <p className="text-base text-gray-700">Thank you for your purchase.</p>

      <Link
        href="/"
        className="inline-flex items-center justify-center px-5 py-3 border border-black rounded-lg text-base font-bold hover:bg-black hover:text-white transition-colors"
      >
        CONTINUE SHOPPING
      </Link>
    </div>
  );
};

const SuccessfulPayment = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base font-medium">Loading payment status…</p>
      </div>
    }
  >
    <PaymentSuccessContent />
  </Suspense>
);

export default SuccessfulPayment;

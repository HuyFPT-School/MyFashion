"use client";
import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "cod">("momo");
  const [loading, setLoading] = useState(false);

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );

  useEffect(() => {
    try {
      const getCustomer = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customers`,
          {
            method: "GET",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setPhone(data.phone);
          setAddress(data.address);
        }
      };
      getCustomer();
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const handleCheckout = async () => {
    try {
      if (!phone.trim() || !address.trim()) {
        toast.error("Please fill in your phone and address");
        return;
      }
      if (!user) {
        router.push("sign-in");
        return;
      }
      setLoading(true);
      // Lưu thông tin customer vào localStorage để dùng sau
      const customerData = {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName,
        phone,
        address,
      };
      localStorage.setItem("checkoutCustomer", JSON.stringify(customerData));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cart.cartItems,
          customer: customerData,
          provider: paymentMethod,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error || "Checkout failed");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else if (paymentMethod === "cod") {
        router.push("/payment_success?method=cod");
      }
    } catch (err) {
      console.log("[checkout_POST]", err);
      toast.error("Checkout error");
      setLoading(false);
    }
  };
  const totalRounded = parseFloat(total.toFixed(2));
  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col">
      <div className="w-2/3">
        <p className="text-2xl font-bold">Shopping Cart</p>
        <hr className="my-6" />
        {cart.cartItems.length === 0 ? (
          <p className="text-body font-bold">No item in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem, index) => (
              <div
                key={index}
                className="w-full max-sm:flex-col max-sm:gap-3 flex px-6 py-5 items-center max-sm:items-start justify-between hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    alt={cartItem.item.title}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body font-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small font-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small font-medium">{cartItem.size}</p>
                    )}
                    <p className="text-small font-medium">
                      ${cartItem.item.price}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex gap-4 items-center ">
                    <MinusCircle
                      onClick={() => {
                        if (cartItem.quantity > 1) {
                          cart.decreaseQuantity(cartItem.item._id);
                        }
                      }}
                    />
                    <p className="text-body font-bold">{cartItem.quantity}</p>
                    <PlusCircle
                      onClick={() => cart.increaseQuantity(cartItem.item._id)}
                    />
                  </div>
                  <Trash
                    className="hover:text-red-500 cursor-pointer"
                    onClick={() => cart.removeItem(cartItem.item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-gray-100 rounded-lg px-4 py-5">
        <p className="text-xl font-bold ">
          Summary
          <span>{`(${cart.cartItems.length} ${
            cart.cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>

        <>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Phone</label>
            <input
              type="tel"
              className="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="+849984799"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Address</label>
            <textarea
              className="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="27/2a đường số 2, Tam Phú, Thủ Đức"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold">Payment method</p>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="momo"
              checked={paymentMethod === "momo"}
              onChange={() => setPaymentMethod("momo")}
            />
            <span>MoMo (All-in-one)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span>Cash on Delivery</span>
          </label>
        </div>

        <div className="flex justify-between text-body font-semibold">
          <span>Total Amount</span>
          <span>$ {totalRounded}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="border border-gray-300 rounded-lg text-base font-bold  py-3 w-full hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

"use client";

import { formatCurrency } from "@/Helpers/formatCurrency";
import { UserOrederRes } from "@/interfaces/UserOrdersInterface";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AllOrders() {
  const [orders, setOrders] = useState<UserOrederRes[] | null>(null);
  async function getOrders() {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem("userId")}`,
    );
    const data: UserOrederRes[] = await res.json();
    setOrders(data);
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 pt-20">
      {orders?.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
        >
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl mb-6">
            <div>
              <p className="text-black font-semibold">
                Order: #{order._id.slice(-5)}
              </p>
              <p className="text-sm text-gray-500 uppercase">
                {order.paymentMethodType === "card"
                  ? "Card Payment"
                  : "Cash Payment"}
              </p>
            </div>

            <div className="text-2xl font-bold text-black">
              {formatCurrency(order.totalOrderPrice)}
            </div>
          </div>

          <div className="flex gap-6 flex-wrap">
            {order.cartItems.map((item) => (
              <div
                key={item._id}
                className="w-48 bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition"
              >
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  width={150}
                  height={150}
                />

                <h3 className="text-sm font-medium mb-1 line-clamp-2 text-black">
                  {item.product.title}
                </h3>

                <p className="text-black text-sm font-semibold">
                  Qty: {item.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

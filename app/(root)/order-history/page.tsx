"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";

const OrdersPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        router.push("/sign-in");
        return;
      }

      try {
        const res = await fetch(`/api/order/customers/${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error("[fetchOrders]", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, router]);

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getOrderStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-orange-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="mt-2 text-sm text-gray-600">
            Check the status of recent orders, manage returns, and discover similar products.
          </p>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">
              When you place orders, they will appear here.
            </p>
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {orders.map((order: any) => {
              const isExpanded = expandedOrders.has(order._id);
              
              return (
                <div
                  key={order._id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-6">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Order Number</p>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            #{order._id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Date Placed</p>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Total Amount</p>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            ${order.totalAmount.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Payment Method</p>
                          <p className="text-sm font-medium text-gray-900 mt-1 uppercase">
                            {order.paymentMethod || 'N/A'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border">
                          {getStatusIcon(order.paymentStatus)}
                          <span className="text-sm font-medium capitalize">
                            {order.paymentStatus}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border">
                          {getOrderStatusIcon(order.orderStatus)}
                          <span className="text-sm font-medium capitalize">
                            {order.orderStatus || 'processing'}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleOrderExpand(order._id)}
                          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 py-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">
                        Order Items ({order.products.length})
                      </h4>
                      
                      <div className="space-y-4">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {order.products.map((orderItem: any, index: number) => (
                          <div
                            key={orderItem._id || index}
                            className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-shrink-0">
                              <Image
                                src={orderItem.product.media[0]}
                                alt={orderItem.product.title}
                                width={80}
                                height={80}
                                className="w-20 h-20 object-cover rounded-md border border-gray-200"
                              />
                            </div>

                            <div className="flex-grow">
                              <h5 className="text-sm font-medium text-gray-900 mb-2">
                                {orderItem.product.title}
                              </h5>
                              
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                {orderItem.color && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-gray-500">Color:</span>
                                    <span className="font-medium">{orderItem.color}</span>
                                  </div>
                                )}
                                
                                {orderItem.size && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-gray-500">Size:</span>
                                    <span className="font-medium">{orderItem.size}</span>
                                  </div>
                                )}
                                
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-500">Qty:</span>
                                  <span className="font-medium">{orderItem.quantity}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex-shrink-0 text-right">
                              <p className="text-sm font-medium text-gray-900">
                                ${orderItem.product.price}
                              </p>
                              {orderItem.quantity > 1 && (
                                <p className="text-xs text-gray-500 mt-1">
                                  ${orderItem.product.price * orderItem.quantity} total
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {order.shippingAddress && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            Shipping Address
                          </h5>
                          <p className="text-sm text-gray-700">{order.shippingAddress}</p>
                          {order.shippingRate && (
                            <p className="text-sm text-gray-600 mt-1">
                              Contact: {order.shippingRate}
                            </p>
                          )}
                        </div>
                      )}

                      {order.paymentTransId && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">
                            Transaction Details
                          </h5>
                          <p className="text-sm text-gray-700">
                            Transaction ID: <span className="font-mono">{order.paymentTransId}</span>
                          </p>
                          {order.paymentTime && (
                            <p className="text-sm text-gray-600 mt-1">
                              Paid on: {new Date(order.paymentTime).toLocaleString()}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          onClick={() => router.push(`/orders/${order._id}`)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          View Details
                        </button>
                        
                        {order.orderStatus === 'delivered' && (
                          <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors">
                            Buy Again
                          </button>
                        )}
                        
                        {order.orderStatus === 'processing' && (
                          <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors">
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
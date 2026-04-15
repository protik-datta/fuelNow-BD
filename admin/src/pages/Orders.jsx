import React, { useState } from 'react';
import { useOrders, useUpdateOrderStatus, useDeleteOrder } from '../hooks/api.hooks';
import DeleteModal from '../utils/DeleteModal';
import { FiSearch, FiEdit2, FiTrash2, FiMoreVertical } from 'react-icons/fi';

const Orders = () => {
  const { data: ordersData, isLoading } = useOrders();
  const updateStatusMutation = useUpdateOrderStatus();
  const deleteOrderMutation = useDeleteOrder();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const ordersArray = Array.isArray(ordersData?.data) ? ordersData.data : [];
  const filteredOrders = ordersArray.filter(order => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone?.includes(searchTerm) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId, newStatus) => {
    updateStatusMutation.mutate({ orderId, status: newStatus });
  };

  const handleDeleteClick = (orderId) => {
    setOrderToDelete(orderId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (orderToDelete) {
      deleteOrderMutation.mutate(orderToDelete);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Orders Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            View and manage all fuel delivery orders.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <div className="relative w-full">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by ID, name, or phone..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            "all",
            "pending",
            "confirmed",
            "in_transit",
            "delivered",
            "cancelled",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize whitespace-nowrap ${
                statusFilter === status
                  ? "bg-gray-900 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table - Desktop View */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Fuel Type</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono font-medium text-gray-900">
                      #{order.orderID?.slice(-6) || order._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.name}
                    </td>
                    <td className="px-6 py-4">{order.phone}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{order.address}</td>
                    <td className="px-6 py-4 font-medium">{order.fuelType}</td>
                    <td className="px-6 py-4">{order.quantity} L</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ৳{order.remaining || order.productPrice}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status || "pending"}
                        onChange={(e) =>
                          handleStatusChange(
                            order.orderID || order._id,
                            e.target.value,
                          )
                        }
                        disabled={updateStatusMutation.isPending}
                        className="text-xs font-semibold px-2.5 py-1.5 rounded-full border border-gray-200 cursor-pointer focus:ring-2 focus:ring-orange-500/20"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteClick(order.orderID || order._id)
                          }
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders Cards - Mobile/Tablet View */}
      <div className="lg:hidden space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-mono text-xs font-medium text-gray-500">
                    #{order.orderID?.slice(-6) || order._id.slice(-6).toUpperCase()}
                  </p>
                  <h4 className="font-bold text-gray-900 mt-1">{order.name}</h4>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-orange-600">৳{order.remaining || order.productPrice}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.fuelType} • {order.quantity}L</p>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-xl text-sm text-gray-600">
                <p className="line-clamp-2">{order.address}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <select
                  value={order.status || "pending"}
                  onChange={(e) =>
                    handleStatusChange(
                      order.orderID || order._id,
                      e.target.value,
                    )
                  }
                  disabled={updateStatusMutation.isPending}
                  className="text-xs font-semibold px-3 py-2 rounded-full border border-gray-200 bg-white cursor-pointer focus:ring-2 focus:ring-orange-500/20"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <div className="flex items-center space-x-2">
                  <button className="p-2.5 text-blue-600 bg-blue-50 rounded-xl">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(order.orderID || order._id)}
                    className="p-2.5 text-red-600 bg-red-50 rounded-xl"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-200 text-center text-gray-500">
            No orders found
          </div>
        )}
      </div>

      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Order"
        message="Are you sure you want to delete this order? This action cannot be undone."
      />
    </div>
  );
};

export default Orders;

import React, { useMemo } from 'react';
import { useOrders, useEmergencies } from '../hooks/api.hooks';
import { FiTrendingUp, FiShoppingCart, FiAlertTriangle, FiClock, FiCheckCircle } from 'react-icons/fi';
import { MdLocalGasStation } from 'react-icons/md';

const StatCard = ({ title, value, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:-translate-y-1 duration-300">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      {trend && (
        <p className={`text-xs mt-2 flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <FiTrendingUp className={`mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
          <span>{Math.abs(trend)}% from last month</span>
        </p>
      )}
    </div>
    <div className={`p-4 rounded-xl ${color}`}>
      {icon}
    </div>
  </div>
);

const Dashboard = () => {
  const { data: ordersData, isLoading: isLoadingOrders } = useOrders();
  const { data: emergenciesData, isLoading: isLoadingEmergencies } = useEmergencies();

  const orders = Array.isArray(ordersData?.data) ? ordersData.data : [];
  const emergencies = Array.isArray(emergenciesData?.data) ? emergenciesData.data : [];

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const completedOrders = orders.filter(o => o.status === 'delivered').length;
    
    // Revenue calculation (assuming totalCost exists on order)
    const revenue = orders.reduce((acc, curr) => acc + (Number(curr.totalCost || curr.productPrice || curr.remaining) || 0), 0);

    const totalEmergencies = emergencies.length;
    const pendingEmergencies = emergencies.filter(e => e.status === 'pending').length;
    
    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      revenue,
      totalEmergencies,
      pendingEmergencies
    };
  }, [orders, emergencies]);

  if (isLoadingOrders || isLoadingEmergencies) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm mt-1">Here's what's happening today.</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          icon={<FiShoppingCart className="w-7 h-7 text-blue-600" />} 
          color="bg-blue-50"
        />
        <StatCard 
          title="Total Revenue" 
          value={`৳${stats.revenue.toLocaleString()}`} 
          icon={<FiTrendingUp className="w-7 h-7 text-green-600" />} 
          color="bg-green-50"
        />
        <StatCard 
          title="Emergencies" 
          value={stats.totalEmergencies} 
          icon={<FiAlertTriangle className="w-7 h-7 text-red-600" />} 
          color="bg-red-50"
          trend={12}
        />
        <StatCard 
          title="Pending Deliveries" 
          value={stats.pendingOrders} 
          icon={<FiClock className="w-7 h-7 text-orange-600" />} 
          color="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Orders Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {orders.slice(0, 4).map((order) => (
              <div key={order._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                    <MdLocalGasStation className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">#{order._id.slice(-6).toUpperCase()}</p>
                    <p className="text-xs text-gray-500">{order.fuelType} • {order.quantity}L</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status?.replace('_', ' ')}
                  </span>
                  <p className="text-xs font-semibold text-gray-900 mt-1">৳{order.totalCost || order.remaining || order.productPrice}</p>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center text-gray-500 py-4 text-sm">No recent orders found.</div>
            )}
          </div>
        </div>

        {/* Action Needed (Emergencies) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Action Needed</h3>
            <span className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              {stats.pendingEmergencies} New
            </span>
          </div>

          <div className="space-y-4">
            {emergencies.filter(e => e.status !== 'delivered' && e.status !== 'cancelled').slice(0, 4).map((emergency) => (
              <div key={emergency._id} className="flex items-start space-x-3 p-3 bg-red-50/50 rounded-xl border border-red-100">
                 <div className="bg-white p-2 rounded-full text-red-500 shadow-sm shrink-0">
                  <FiAlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-900">Emergency Fuel Request</p>
                  <p className="text-xs text-red-700 mt-0.5 line-clamp-1">{emergency.location || 'Location not provided'}</p>
                  <p className="text-xs font-medium text-red-600 mt-2">{emergency.phone}</p>
                </div>
              </div>
            ))}
            {emergencies.filter(e => e.status !== 'delivered' && e.status !== 'cancelled').length === 0 && (
              <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                <FiCheckCircle className="w-10 h-10 text-green-400 mb-2" />
                <p className="text-sm font-medium">All caught up!</p>
                <p className="text-xs">No pending emergencies.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

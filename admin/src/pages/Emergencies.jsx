import React, { useState } from 'react';
import { useEmergencies, useUpdateEmergencyStatus, useDeleteEmergency } from '../hooks/api.hooks';
import { FiSearch, FiEdit2, FiTrash2, FiMapPin, FiPhone } from 'react-icons/fi';

const Emergencies = () => {
  const { data: emergenciesData, isLoading } = useEmergencies();
  const updateStatusMutation = useUpdateEmergencyStatus();
  const deleteEmergencyMutation = useDeleteEmergency();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const emergencies = Array.isArray(emergenciesData?.data) ? emergenciesData.data : [];

  const filteredEmergencies = emergencies.filter(emergency => {
    const matchesSearch = 
      emergency._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emergency.phone?.includes(searchTerm) ||
      emergency.location?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || emergency.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (emergencyId, newStatus) => {
    updateStatusMutation.mutate({ emergencyId, status: newStatus });
  };

  const handleDelete = (emergencyId) => {
    if (window.confirm('Are you sure you want to delete this emergency record?')) {
      deleteEmergencyMutation.mutate(emergencyId);
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
          <h2 className="text-2xl font-bold text-gray-900">Emergency Requests</h2>
          <p className="text-gray-500 text-sm mt-1">Manage urgent and stranded customer requests.</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm shadow-red-600/20">
          Export Report
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Search by ID, location, or phone..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 shrink-0">
          {['all', 'pending', 'accepted', 'on_the_way', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
                statusFilter === status 
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Emergencies Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Requested At</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredEmergencies.length > 0 ? (
                filteredEmergencies.map((emergency) => (
                  <tr key={emergency._id} className="hover:bg-red-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-medium text-gray-900">#{emergency._id.slice(-6).toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-gray-900 font-medium">
                        <FiPhone className="text-gray-400 w-4 h-4" />
                        <span>{emergency.phone || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 max-w-xs">
                        <FiMapPin className="text-gray-400 w-4 h-4 shrink-0" />
                        <span className="truncate" title={emergency.location}>{emergency.location || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(emergency.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={emergency.status || 'pending'}
                        onChange={(e) => handleStatusChange(emergency.emergencyOrderID || emergency._id, e.target.value)}
                        disabled={updateStatusMutation.isPending}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-red-500/20 appearance-none bg-no-repeat bg-right ${
                          emergency.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          emergency.status === 'pending' ? 'bg-red-100 text-red-700' :
                          emergency.status === 'cancelled' ? 'bg-gray-100 text-gray-700' :
                          'bg-orange-100 text-orange-700'
                        }`}
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundSize: '1rem', paddingRight: '1.5rem', textTransform: 'capitalize' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="on_the_way">On the Way</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(emergency.emergencyOrderID || emergency._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-100 p-3 rounded-full mb-3">
                        <FiSearch className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="font-medium text-gray-900">No emergencies found</p>
                      <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Emergencies;

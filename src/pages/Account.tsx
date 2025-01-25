import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { RootState } from '../store';
import { setUser, logout } from '../store/slices/authSlice';
import { User, Settings, LogOut, Package, CreditCard, MapPin } from 'lucide-react';

interface OrderType {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

// Sample order data - In a real app, this would come from an API
const sampleOrders: OrderType[] = [
  {
    id: 'ORD-001',
    date: '2024-03-15',
    total: 1299,
    status: 'delivered',
    items: [
      {
        name: 'iPhone 15 Pro',
        quantity: 1,
        price: 999,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569',
      },
    ],
  },
];

export default function Account() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('orders');

  // Simulated login for demo
  if (!isAuthenticated) {
    dispatch(setUser({
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
    }));
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-6">
            {location.state?.success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-700">{location.state.message}</p>
              </div>
            )}
            
            {sampleOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize bg-indigo-100 text-indigo-800">
                    {order.status}
                  </span>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <div key={index} className="py-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      ${order.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Profile Information
            </h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue={user?.name}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue={user?.email}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        );

      case 'addresses':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Saved Addresses
              </h3>
              <button className="text-indigo-600 hover:text-indigo-700">
                Add New Address
              </button>
            </div>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Home</p>
                    <p className="text-gray-600 mt-1">
                      123 Main St<br />
                      Apt 4B<br />
                      New York, NY 10001
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-700">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Payment Methods
              </h3>
              <button className="text-indigo-600 hover:text-indigo-700">
                Add New Card
              </button>
            </div>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">
                        •••• •••• •••• 4242
                      </p>
                      <p className="text-gray-600">Expires 12/25</p>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-700">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Account Settings
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Email Notifications
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700">Order updates</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700">Promotions</span>
                  </label>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Privacy
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700">
                      Share usage data
                    </span>
                  </label>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        );
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-indigo-100 rounded-full p-2">
                <User className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {user?.name}
                </h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart3,
  DollarSign,
  Users,
  Package,
  TrendingUp,
  ShoppingBag,
  AlertCircle,
} from 'lucide-react';

// Sample data - In a real app, this would come from your backend
const sampleData = {
  totalSales: 125000,
  totalOrders: 450,
  totalCustomers: 280,
  lowStockItems: 5,
  recentOrders: [
    { id: '1', customer: 'John Doe', total: 999, status: 'completed', date: '2024-03-15' },
    { id: '2', customer: 'Jane Smith', total: 1299, status: 'processing', date: '2024-03-14' },
  ],
  topProducts: [
    { id: '1', name: 'iPhone 15 Pro', sales: 50, revenue: 49950 },
    { id: '2', name: 'Samsung S24 Ultra', sales: 45, revenue: 53955 },
  ],
  dailySales: [
    { date: '2024-03-10', sales: 15000 },
    { date: '2024-03-11', sales: 18000 },
    { date: '2024-03-12', sales: 12000 },
    { date: '2024-03-13', sales: 21000 },
    { date: '2024-03-14', sales: 16000 },
    { date: '2024-03-15', sales: 25000 },
    { date: '2024-03-16', sales: 18000 },
  ],
};

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('admin.title')}</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-indigo-100 rounded-full p-3">
              <DollarSign className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('admin.revenue')}</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${sampleData.totalSales.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-3">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('admin.orders')}</p>
              <p className="text-2xl font-semibold text-gray-900">
                {sampleData.totalOrders.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('admin.customers')}</p>
              <p className="text-2xl font-semibold text-gray-900">
                {sampleData.totalCustomers.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-red-100 rounded-full p-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{t('admin.lowStock')}</p>
              <p className="text-2xl font-semibold text-gray-900">
                {sampleData.lowStockItems}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">{t('admin.recentOrders')}</h2>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {sampleData.recentOrders.map((order) => (
                  <li key={order.id} className="py-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ${order.total.toLocaleString()}
                        </p>
                        <p className={`text-sm ${
                          order.status === 'completed' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">{t('admin.topSelling')}</h2>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {sampleData.topProducts.map((product) => (
                  <li key={product.id} className="py-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {product.sales} units sold
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ${product.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">{t('admin.dailySales')}</h2>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-end space-x-2">
              {sampleData.dailySales.map((day) => {
                const height = (day.sales / 25000) * 100; // Max height percentage
                return (
                  <div key={day.date} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-indigo-200 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                    <p className="mt-2 text-xs text-gray-500 rotate-45 origin-left">
                      {new Date(day.date).toLocaleDateString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
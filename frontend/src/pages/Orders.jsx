import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const MyOrders = () => {
  const navigate = useNavigate()
  const [orders] = useState([])
  const [filter, setFilter] = useState('all')

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6] py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage all your orders</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'processing', 'completed'].map((status) => (
              <button key={status} onClick={() => setFilter(status)}
                className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${filter === status ? 'bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 sm:p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' ? "You haven't placed any orders yet" : `No ${filter} orders found`}
            </p>
            <Button onClick={() => navigate('/')}>Start Shopping</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{order.platform} - {order.service}</h3>
                    <p className="text-sm text-gray-600">Order ID: {order._id?.slice(-8).toUpperCase()}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigate(`/track`)}>Track Order</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders

import React, { useState } from 'react';
import StatusUpdateModal from './StatusUpdateModal';
import './OrdersManagement.css';
import { Link } from 'react-router-dom';
import OrdersCalendarView from './OrdersCalendarView'; // Import the OrdersCalendarView component
import Popup from 'reactjs-popup'; // Import the Popup component

function OrdersManagement() {
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      orderId: 'ORD001', 
      customerName: 'Customer 1', 
      orderDate: '2024-03-10', status: 'Pending',
      address: '123 Main St',
      city: 'Anytown',
      postalCode: '12345',
      country: 'Country',
      products: [
        { name: 'Product 1', category: 'Category 1', price: 10, stockQuantity: 100 },
        { name: 'Product 2', category: 'Category 2', price: 20, stockQuantity: 200 }
      ],
      shipper: { name: 'Shipper Name', phone: '123-456-7890' },
      estimatedDeliveryDate: '2024-03-15'
    },
    { 
      id: 2, 
      orderId: 'ORD002', 
      customerName: 'Customer 2', 
      orderDate: '2024-03-11', 
      status: 'Shipped',
      address: '456 Elm St',
      city: 'Othertown',
      postalCode: '54321',
      country: 'Country',
      products: [
        { name: 'Product 3', category: 'Category 3', price: 30, stockQuantity: 150 },
        { name: 'Product 4', category: 'Category 4', price: 40, stockQuantity: 250 }
      ],
      shipper: { name: 'Another Shipper', phone: '987-654-3210' },
      estimatedDeliveryDate: '2024-03-19'
    },
    { 
      id: 3, 
      orderId: 'ORD003', 
      customerName: 'Customer 3', 
      orderDate: '2024-03-11', 
      status: 'Pending',
      address: '123 Main St',
      city: 'Anytown',
      postalCode: '12345',
      country: 'Country',
      products: [
        { name: 'Product 1', category:'Category 1', price: 10, stockQuantity: 100 },
        { name: 'Product 2', category: 'Category 2', price: 20, stockQuantity: 200 }
      ],
      shipper: { name: 'Shipper Name', phone: '123-456-7890' },
      estimatedDeliveryDate: '2024-03-15'
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const viewOrderDetails = (orderId) => {
    const order = orders.find(order => order.orderId === orderId);
    if (order) {
      setSelectedOrder(order);
    }
  };

  const updateOrderStatus = (orderId) => {
    setShowUpdateModal(true);
    setSelectedOrderId(orderId);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    const orderToUpdate = orders.find(order => order.orderId === orderId);
    if (orderToUpdate.status !== newStatus) {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
    setShowUpdateModal(false);
  };

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.orderId !== orderId));
  };

  return (
    <div className="main">
      {/* Navigation */}
      <nav className="navbar">
        <h1 className="navbar-title">
          <Link to="/" className="nav-link">Enterprise Resource Planning</Link>
        </h1>
        <div className="navbar-buttons">
          <Link to="/products" className="btn manage-products-btn">Manage Products</Link>
          <Link to="/orders"className="btn manage-orders-btn">Manage Orders</Link>
        </div>
      </nav>

      {/* Orders Management */}
      <h2>Orders Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.orderDate}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => viewOrderDetails(order.orderId)}>View Details</button>
                <button onClick={() => updateOrderStatus(order.orderId)}>Update Status</button>
                <button onClick={() => deleteOrder(order.orderId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Details Popup */}
      {selectedOrder && (
        <Popup
          open={selectedOrder !== null}
          closeOnDocumentClick
          onClose={() => setSelectedOrder(null)}
        >
          <div className="modal">
            <button className="close-button" onClick={() => setSelectedOrder(null)}>
              &times;
            </button>
            <h2 className="heading">Order Details</h2>
            <div className="order-info">
              {selectedOrder.products.map((product, index) => (
                <div key={index}>
                  <p>Name: {product.name}</p>
                  <p>Category: {product.category}</p>
                  <p>Price: ${product.price}</p>
                  <p>Stock Quantity: {product.stockQuantity}</p>
                </div>
              ))}
            </div>
            <div className="order-footer">
              <h3>Shipper Contact Info</h3>
              <p>Name: {selectedOrder.shipper.name}</p>
              <p>Phone: {selectedOrder.shipper.phone}</p>
              <h3>Estimated Delivery Date</h3>
              <p>{selectedOrder.estimatedDeliveryDate}</p>
            </div>
          </div>
        </Popup>
      )}

      {/* Status Update Modal */}
      {showUpdateModal && (
        <StatusUpdateModal orderId={selectedOrderId} onUpdateStatus={handleStatusUpdate} />
      )}

      {/* Orders Calendar View */}
      <OrdersCalendarView orders={orders} />
    </div>
  );
}

export default OrdersManagement;
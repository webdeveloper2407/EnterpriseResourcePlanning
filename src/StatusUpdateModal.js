// StatusUpdateModal.js
import React, { useState } from 'react';

const StatusUpdateModal = ({ orderId, onUpdateStatus }) => {
  const [newStatus, setNewStatus] = useState('');

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleSubmit = () => {
    onUpdateStatus(orderId, newStatus);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        <h2>Update Status</h2>
        <select value={newStatus} onChange={handleStatusChange}>
          <option value="Pending">Pending</option>
          <option value="Received">Received</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
        </select>
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
};

export default StatusUpdateModal;

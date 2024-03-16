import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function Dashboard() {
  return (
    <div className="dashboard-container"> 
      <nav className="navbar">
        <h1 className="navbar-title">Enterprise Resource Planning</h1>
        <div className="navbar-buttons">
          <Link to="/products" className="btn manage-products-btn">Manage Products</Link>
          <Link to="/orders" className="btn manage-orders-btn">Manage Orders</Link>
        </div>
      </nav>
      
      <div className="system-info">
        <h2>Welcome to Our System</h2>
        <p>This system provides various features for managing products and orders. You can add, edit, and delete products, as well as view and update order details.</p>
      </div>

      <div className="cards-container">
        <div className="card">
          <Card sx={{ maxWidth: 445 }}>
            <CardMedia
              className="card-media"
              image="https://cdn5.vectorstock.com/i/1000x1000/02/04/supermarket-grocery-products-cartoon-vector-22670204.jpg"
              title="Product"
            />
            <CardContent className="card-content">
              <Typography gutterBottom variant="h5" component="div" className="card-title">
                No of Products :2
              </Typography>
              <Typography variant="body2" color="text.secondary" className="card-text">
              This card displays the total number of products available in the system.
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div className="card">
          <Card sx={{ maxWidth: 445 }}>
            <CardMedia
              className="card-media"
              image="https://static.vecteezy.com/system/resources/previews/002/958/592/large_2x/online-order-product-vector.jpg"
              title="Product"
            />
            <CardContent className="card-content">
              <Typography gutterBottom variant="h5" component="div" className="card-title">
                No of Orders :3
              </Typography>
              <Typography variant="body2" color="text.secondary" className="card-text">
              This card displays the total number of orders available in the system.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

//import logo from './logo.svg';
//import './App.css';
import React from 'react';
//import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProductsManagement from './ProductsManagement';
import OrdersManagement from './OrdersManagement';
import OrdersCalendarView from './OrdersCalendarView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route path="/products" element={<ProductsManagement/>} />
        <Route path='/orders' element={<OrdersManagement/>}/>
        <Route path="/calendar" element={<OrdersCalendarView/>} />
        </Routes>
      </Router>
  );
};

export default App;


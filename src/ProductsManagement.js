import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductsManagemnet.css';

const ProductsManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Category 1', price: 10, stockQuantity: 100 },
    { id: 2, name: 'Product 2', category: 'Category 2', price: 20, stockQuantity: 200 },
  ]);
  const [formData, setFormData] = useState({
    id: products.length + 1, // Incremental ID based on current products length
    name: '',
    category: '',
    price: '',
    stockQuantity: ''
  });
  const [editingId, setEditingId] = useState(null);

  const addProduct = () => {
    const newProduct = { ...formData };
    setProducts([...products, newProduct]);
    setFormData({
      id: products.length + 1, // Incremental ID
      name: '',
      category: '',
      price: '',
      stockQuantity: ''
    });
  };

  const editProduct = (id) => {
    const productToEdit = products.find(product => product.id === id);
    setFormData({ ...productToEdit });
    setEditingId(id);
  };

  const updateProduct = () => {
    const updatedProducts = products.map(product => {
      if (product.id === editingId) {
        return formData;
      }
      return product;
    });
    setProducts(updatedProducts);
    setFormData({
      id: products.length + 1, // Incremental ID
      name: '',
      category: '',
      price: '',
      stockQuantity: ''
    });
    setEditingId(null);
  };

  const deleteProduct = (id) => {
    const filteredProducts = products.filter(product => product.id !== id);
    setProducts(filteredProducts);
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className="navbar-title">
          <Link to="/" className="nav-link">Enterprise Resource Planning</Link>
        </h1>
        <div className="navbar-buttons">
          <Link to="/products" className="btn manage-products-btn">Manage Products</Link>
          <Link to="/orders" className="btn manage-orders-btn">Manage Orders</Link>
        </div>
      </nav>
      <h2>Products Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price(in$)</th>
            <th>Stock Quantity(in Units)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stockQuantity}</td>
              <td>
                <button onClick={() => editProduct(product.id)}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingId !== null ? (
        <div className="form-container">
          <h2>Edit Product</h2>
          <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
          <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
          <input type="number" placeholder="Stock Quantity" value={formData.stockQuantity} onChange={e => setFormData({ ...formData, stockQuantity: e.target.value })} />
          <button onClick={updateProduct}>Update</button>
        </div>
      ) : (
        <div className="form-container">
          <h2>Add Product</h2>
          <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
          <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
          <input type="number" placeholder="Stock Quantity" value={formData.stockQuantity} onChange={e => setFormData({ ...formData, stockQuantity: e.target.value })} />
          <button onClick={addProduct}>Add Product</button>
        </div>
      )}
      <img src="https://thumbs.dreamstime.com/b/nadd-product-add-shopping-isolated-vector-icon-can-be-very-easily-edit-modified-n-add-product-add-shopping-isolated-vector-131218210.jpg" alt="Add Product" className="add-product-image" />
      
    </div>
  );
};

export default ProductsManagement;

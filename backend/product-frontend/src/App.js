import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = 'https://product-data-explorer-1-wj1.onrender.com/products'
function App() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // GET PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://product-data-explorer-1-wj1.onrender.com/products");
      setProducts(res.data);
    } catch (err) {
      setError("Unable to load products.");
    }
  };

  // ADD PRODUCT
  const addProduct = async () => {
    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Please enter a valid price greater than 0.");
      return;
    }

    try {
      await axios.post("https://product-data-explorer-1-wj1.onrender.com/products", {
        name: name.trim(),
        price: Number(price),
      });

      setName("");
      setPrice("");
      setMessage("Product added successfully.");

      fetchProducts();
    } catch (err) {
      setError("Failed to add product.");
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`https://product-data-explorer-1-wj1.onrender.com/products/${id}`);

      setMessage("Product deleted successfully.");
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  // START EDIT
  const startEdit = (product) => {
    setEditId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);

    setMessage("");
    setError("");
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditPrice("");
  };

  // UPDATE PRODUCT
  const updateProduct = async () => {
    setMessage("");
    setError("");

    if (!editName.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!editPrice || Number(editPrice) <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    try {
      await axios.patch(`${`https://product-data-explorer-1-wj1.onrender.com/products/${editId}`}`, {
        name: editName.trim(),
        price: Number(editPrice),
      });

      cancelEdit();

      setMessage("Product updated successfully.");

      fetchProducts();
    } catch (err) {
      setError("Failed to update product.");
    }
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div>
          <h1>Product Manager</h1>
          <p>Manage your products easily</p>
        </div>

        <div className="product-count">
          <strong>{products.length}</strong>
          <span>Products</span>
        </div>
      </header>

      <main className="container">

        {/* ADD PRODUCT */}
        <section className="add-card">
          <h2 className="section-title">Add Product</h2>
          <p className="section-subtitle">
            Create a new product
          </p>

          <div className="form">
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="1"
            />

            <button className="primary-btn" onClick={addProduct}>
              + Add Product
            </button>
          </div>

          {message && (
            <div className="message success">
              {message}
            </div>
          )}

          {error && (
            <div className="message error">
              {error}
            </div>
          )}
        </section>

        {/* EDIT PRODUCT */}
        {editId && (
          <section className="edit-card">
            <h2 className="section-title">Edit Product</h2>

            <div className="form">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                min="1"
              />
            </div>

            <div className="edit-actions">
              <button
                className="update-btn"
                onClick={updateProduct}
              >
                Update Product
              </button>

              <button
                className="cancel-btn"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </div>
          </section>
        )}

        {/* PRODUCTS */}
        <section className="products-section">

          <div className="products-header">
            <h2>Products</h2>
            <p>All products in your database</p>
          </div>

          {products.length === 0 ? (
            <div className="empty">
              <h3>No products found</h3>
              <p>Add your first product above.</p>
            </div>
          ) : (
            <div className="product-grid">

              {products.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                >

                  <div className="product-icon">
                    📦
                  </div>

                  <h3>{product.name}</h3>

                  <div className="product-id">
                    ID: {product.id}
                  </div>

                  <div className="price">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </div>

                  <div className="actions">

                    <button
                      className="edit-btn"
                      onClick={() => startEdit(product)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default App;
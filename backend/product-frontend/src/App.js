import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // GET PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:3000/products").then((res) => {
      setProducts(res.data);
    });
  };

  // ADD PRODUCT
  const addProduct = () => {
    axios
      .post("http://localhost:3000/products", {
        name,
        price: Number(price),
      })
      .then(() => {
        setName("");
        setPrice("");
        fetchProducts();
      });
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:3000/products/${id}`).then(() => {
      fetchProducts();
    });
  };

  // START EDIT
  const startEdit = (product) => {
    setEditId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
  };

  // UPDATE PRODUCT
  const updateProduct = () => {
    axios
      .patch(`http://localhost:3000/products/${editId}`, {
        name: editName,
        price: Number(editPrice),
      })
      .then(() => {
        setEditId(null);
        setEditName("");
        setEditPrice("");
        fetchProducts();
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Manager</h1>

      {/* ADD PRODUCT */}
      <h3>Add Product</h3>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addProduct}>Add</button>

      <hr />

      {/* EDIT PRODUCT */}
      {editId && (
        <>
          <h3>Edit Product</h3>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
          />
          <button onClick={updateProduct}>Update</button>
          <hr />
        </>
      )}

      {/* PRODUCT LIST */}
      <h3>Products</h3>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <b>{product.name}</b> – ₹{product.price}
              <button onClick={() => startEdit(product)}>Edit</button>
              <button onClick={() => deleteProduct(product.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

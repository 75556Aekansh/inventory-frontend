import { useEffect, useState } from "react";
import API from "../../api/api";
import './Sales.css';

function Sales() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [salesHistory, setSalesHistory] = useState([]);

  const fetchSales = async () => {
    try {
      const res = await API.get("/transactions");
      setSalesHistory(res.data.data.filter((t) => t.transaction_type === "sale"));
    } catch (err) {
      console.error("Error fetching sales history:", err);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleSale = async () => {
    try {
      await API.post("/sales", { product_id: productId, quantity: parseInt(quantity, 10) });
      alert("Sale successful!");
      fetchSales();
    } catch (err) {
      console.error("Error creating sale:", err);
      alert("Sale failed");
    }
  };

  return (
    <div className="sales-page">
      <h2>Sales Page</h2>
      <div>
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleSale}>Sell</button>
      </div>

      <h3>Sales History</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Avg Unit Cost</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {salesHistory.map((s, idx) => (
            <tr key={idx}>
              <td>{new Date(s.transaction_timestamp).toLocaleString()}</td>
              <td>{s.product_name}</td>
              <td>{s.quantity}</td>
              <td>{s.unit_price}</td>
              <td>{s.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;

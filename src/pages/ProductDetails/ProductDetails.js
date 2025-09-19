import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import './ProductDetails.css';
import React from "react";


function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [batches, setBatches] = useState([]);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await API.get(`/inventory/${productId}`);
        setProduct(res1.data.data);

        const res2 = await API.get(`/inventory/${productId}/batches`);
        setBatches(res2.data.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };
    fetchData();
  }, [productId]);

  const handleSale = async () => {
    try {
      const res = await API.post("/sales", {
        product_id: productId,
        quantity: parseInt(quantity, 10),
      });
      alert("Sale successful!");
      console.log(res.data);
    } catch (err) {
      console.error("Error processing sale:", err);
      alert("Failed to process sale");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <h2>Product Details: {product.product_name}</h2>
      <p><b>Stock:</b> {product.current_quantity}</p>
      <p><b>Avg Cost:</b> {Number(product.weighted_average_cost).toFixed(2)}</p>

      <h3>Batches</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.quantity}</td>
              <td>{b.unit_price}</td>
              <td>{new Date(b.purchase_timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Sell Product</h3>
      <input
        type="number"
        value={quantity}
        placeholder="Enter quantity"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleSale}>Sell</button>
    </div>
  );
}

export default ProductDetails;

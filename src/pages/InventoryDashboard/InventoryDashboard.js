import { useEffect, useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";
import KafkaSimulator from "../KafkaSimulator/KafkaSimulator";
import './InventoryDashboard.css';


function InventoryDashboard() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await API.get("/inventory");
        setInventory(res.data.data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
      }
    };
    fetchInventory();
  }, []);

  return (
    <div className="dashboard">
      <h2>Inventory Dashboard</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Total Value</th>
            <th>Avg Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((p) => (
            <tr key={p.product_id}>
              <td>{p.product_id}</td>
              <td>{p.product_name}</td>
              <td>{p.current_quantity}</td>
              <td>{p.total_inventory_value}</td>
              <td>{Number(p.weighted_average_cost).toFixed(2)}</td>
              <td>
                <Link to={`/inventory/${p.product_id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px" }}>
        <KafkaSimulator />
      </div>
      <div style={{ marginTop: "20px" }}>
       <Link to="/transactions">
         <button>View Transactions</button>
       </Link>
       </div>

    </div>
  );
}

export default InventoryDashboard;

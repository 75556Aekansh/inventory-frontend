import { useEffect, useState } from "react";
import API from "../../api/api";
import './Transactions.css';
import React from "react";


const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await API.get("/transactions");
        setTransactions(res.data.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="transactions-page">
      <h2>Transactions</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Type</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Cost</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, idx) => (
            <tr key={idx}>
              <td>{t.transaction_type}</td>
              <td>{t.product_name}</td>
              <td>{t.quantity}</td>
              <td>{Number(t.total_amount).toFixed(2)}</td>
              <td>{new Date(t.transaction_timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

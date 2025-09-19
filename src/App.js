import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/UserLogin/Login";
import InventoryDashboard from "./pages/InventoryDashboard/InventoryDashboard";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Transactions from "./pages/Transactions/Transactions";
import KafkaSimulator from "./pages/KafkaSimulator/KafkaSimulator";
import ProtectedRoute from "./components/ProtectedRoute";
import Sales from "./pages/Sales/Sales";
import  './App.css';
import React from "react";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/inventory" element={<ProtectedRoute><InventoryDashboard /></ProtectedRoute>} />
        <Route path="/inventory/:productId" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/kafka" element={<ProtectedRoute><KafkaSimulator /></ProtectedRoute>} />
        <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} /> 
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

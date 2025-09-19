import API from "../../api/api";
import './KafkaSimulator.css';
import React from "react";


const KafkaSimulator = () => {
  const sendDummyEvent = async () => {
    await API.post("/kafka/simulate");
    alert("Dummy events sent!");
  };

  return (
    <div className="kafka-container">
      <h3>EVENTS STIMULATOR</h3>
      <button onClick={sendDummyEvent}>Stimulate Events</button>
    </div>
  );
};

export default KafkaSimulator;

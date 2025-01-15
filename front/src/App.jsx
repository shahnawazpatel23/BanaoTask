import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";


const socket = io("http://localhost:5000"); // Update to your backend URL

const App = () => {
  const [cryptoPrices, setCryptoPrices] = useState();
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    crypto: "",
    condition: "greater_than",
    value: 0,
  });

  // Listen for real-time updates
  useEffect(() => {
    socket.on("prices", (prices) => {
      console.log("Received price update:", prices);
      setCryptoPrices(JSON.parse(prices));
    });

    

    const fetchPrices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/");
        setCryptoPrices(response.data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();

    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle new alert submission
  const handleAlertSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/alerts", newAlert); // Update URL if needed
      alert("Alert created successfully!");
    } catch (error) {
      console.error("Error creating alert:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white p-4 text-center font-bold text-lg">
        Crypto Alert System
      </header>
      <main className="p-4">
        {/* Live Prices */}
        <section className="mb-6">
          {cryptoPrices ? (
            <div>
              <h4>Available Prices:</h4>
              <ul>
                {Object.entries(cryptoPrices).map(([key, { usd }]) => (
                  <li key={key}>
                    {key.toUpperCase()}: ${usd.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h4>Fetching Prices ...</h4>
          )}
        </section>

        {/* Alert Form */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Create an Alert</h2>
          <form
            className="bg-white p-4 shadow rounded"
            onSubmit={handleAlertSubmit}
          >
            <div className="mb-4">
              <label className="block mb-1 font-bold">Crypto</label>
              <input
                type="text"
                placeholder="e.g., bitcoin"
                className="w-full p-2 border rounded"
                value={newAlert.crypto}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, crypto: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Condition</label>
              <select
                className="w-full p-2 border rounded"
                value={newAlert.condition}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, condition: e.target.value })
                }
              >
                <option value="greater_than">Greater Than</option>
                <option value="less_than">Less Than</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Value (USD)</label>
              <input
                type="number"
                placeholder="e.g., 50000"
                className="w-full p-2 border rounded"
                value={newAlert.value}
                onChange={(e) =>
                  setNewAlert({
                    ...newAlert,
                    value: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Alert
            </button>
          </form>
        </section>

        
       
      </main>
    </div>
  );
};

export default App;

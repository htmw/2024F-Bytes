import React, { useEffect, useState } from "react";

const HistoryComponent = () => {
  const [history, setHistory] = useState([
    { input: "Test", output: "Teeee" },
    { input: "Test", output: "Teeee" },
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch translation history from the database
  /*useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:3000/history"); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setHistory(data); // Assuming data is an array of objects { input, output }
        } else {
          setErrorMessage("Failed to fetch translation history.");
        }
      } catch (error) {
        console.error("Error fetching translation history:", error);
        setErrorMessage("Error fetching translation history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);*/

  return (
    <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl relative">
      <h2 className="text-xl font-semibold mb-4">Translation History</h2>

      {loading ? (
        <div className="text-gray-500 text-center">Loading...</div>
      ) : errorMessage ? (
        <div className="text-red-500 text-center">{errorMessage}</div>
      ) : history.length === 0 ? (
        <div className="text-gray-500 text-center">No history available.</div>
      ) : (
        <div className="space-y-4">
          {history.map((entry, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-md bg-gray-50"
            >
              <h3 className="font-semibold">Input:</h3>
              <p className="mb-2">{entry.input}</p>
              <h3 className="font-semibold">Output:</h3>
              <p>{entry.output}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryComponent;

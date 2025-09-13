import { useState, useEffect } from "react";
import axios from "axios";
import { LuPen, LuTrash } from "react-icons/lu";
import { Link } from "react-router-dom";

const Publisher = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPublisher = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7000/api/publisher/");

      setData(response.data);
    } catch (error) {
      setError("Failed to fetch the data", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPublisher();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold">Loading ...</h2>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[70vh] p-5 bg-slate-50/5">
      {error && <p className="font-bold text-red-500">{error}</p>}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Suppliers</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition">
          <Link to={`/publisher/create`}>+ Add Publisher</Link>
        </button>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-6xl max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mb-5">
          {data.map((d) => (
            <div
              key={d._id}
              className="flex flex-col bg-white shadow p-10 space-y-7"
            >
              <h2 className="text-lg font-bold">{d.name}</h2>
              <p className="text-gray-400">{d.contactInfo}</p>
              <div className="flex space-x-5">
                <button className="edit-card-button">
                  <LuPen />
                </button>
                <button className="delete-card-button">
                  <LuTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publisher;

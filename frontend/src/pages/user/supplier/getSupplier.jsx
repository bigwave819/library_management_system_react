import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LuPen, LuTrash } from "react-icons/lu";

const Supplier = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7000/api/suppliers/");
      setData(response.data);
    } catch (err) {
      setError("⚠️ Failed to fetch suppliers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <div className="w-full min-h-[80vh] p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Page Header */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Suppliers</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition">
          <Link to={`/supplier/create`}>+ Add Supplier</Link>
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="max-w-5xl mx-auto mb-6 p-4 rounded-lg bg-red-100 text-red-700 border border-red-300">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="max-w-5xl mx-auto grid gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.length > 0 ? (
            data.map((d) => (
              <div
                key={d.id || d._id}
                className="p-5 rounded-xl bg-white shadow-sm border border-gray-200 hover:shadow-lg hover:scale-[1.01] transition transform"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {d.name}
                </h2>
                <div className="flex space-x-3">
                  <button className="edit-card-button">
                    <LuPen/>
                  </button>
                  <button className="delete-card-button">
                    <LuTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No suppliers found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Supplier;

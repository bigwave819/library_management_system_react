import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    publisher: '',
    supplier: '',
    availableCopies: 1
  });
  
  // State for suppliers and publishers
  const [suppliers, setSuppliers] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate()

  // Fetch suppliers and publishers on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch suppliers
        const suppliersResponse = await fetch('http://localhost:7000/api/suppliers');
        const suppliersData = await suppliersResponse.json();
        setSuppliers(suppliersData);
        
        // Fetch publishers
        const publishersResponse = await fetch('http://localhost:7000/api/publisher');
        const publishersData = await publishersResponse.json();
        setPublishers(publishersData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to load suppliers and publishers');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:7000/api/book/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setMessage('Book created successfully!');
        // Reset form
        setFormData({
          title: '',
          publisher: '',
          supplier: '',
          availableCopies: 1
        });

        navigate("/books")
      } else {
        setMessage('Failed to create book');
      }
    } catch (error) {
      console.error('Error creating book:', error);
      setMessage('Error creating book');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full justify-center flex items-center p-10 bg-gray-50 min-h-screen'>
      <form onSubmit={handleSubmit} className='md:w-3xl max-w-3xl w-full shadow-xl bg-white space-y-6 p-7 rounded-lg'>
        <h2 className='text-2xl font-bold text-gray-800 text-center'>Add New Book</h2>
        
        {message && (
          <div className={`p-3 rounded-md ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-slate-600 font-medium">Title *</label>
          <input 
            type='text'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            required
            className='w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter book title'
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-slate-600 font-medium">Publisher *</label>
          <select
            name='publisher'
            value={formData.publisher}
            onChange={handleInputChange}
            required
            className='w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value="">Select a publisher</option>
            {publishers.map(publisher => (
              <option key={publisher._id} value={publisher._id}>
                {publisher.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-slate-600 font-medium">Supplier *</label>
          <select
            name='supplier'
            value={formData.supplier}
            onChange={handleInputChange}
            required
            className='w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value="">Select a supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-slate-600 font-medium">Available copies *</label>
          <input 
            type='number'
            name='availableCopies'
            value={formData.availableCopies}
            onChange={handleInputChange}
            required
            min="0"
            className='w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter number of copies'
          />
        </div>
        
        <div>
          <button 
            type='submit' 
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            {isLoading ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
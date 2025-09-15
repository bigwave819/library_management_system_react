import React, { useState, useEffect } from 'react';

const BookManagementSystem = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:7000/api/book/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetail = () => {
    setSelectedBook(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Books</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchBooks}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Book Management System</h1>
          <p className="text-gray-600">Browse and manage your book collection</p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600">{books.length}</div>
            <div className="text-gray-600">Total Books</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-green-600">
              {books.filter(book => book.availableCopies > 0).length}
            </div>
            <div className="text-gray-600">Available Books</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600">
              {new Set(books.map(book => book.publisher?.name)).size}
            </div>
            <div className="text-gray-600">Publishers</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-orange-600">
              {new Set(books.map(book => book.supplier?.name)).size}
            </div>
            <div className="text-gray-600">Suppliers</div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {books.map(book => (
            <div 
              key={book.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleBookSelect(book)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800 truncate">{book.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${book.availableCopies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {book.availableCopies > 0 ? `${book.availableCopies} available` : 'Out of stock'}
                  </span>
                </div>
                
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <i className="fas fa-building text-blue-500 mr-2 w-5"></i>
                    <span className="truncate">{book.publisher?.name || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-truck text-purple-500 mr-2 w-5"></i>
                    <span className="truncate">{book.supplier?.name || 'N/A'}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>
                      <i className="fas fa-calendar-alt mr-1"></i>
                      {formatDate(book.borrowDate)}
                    </div>
                    <div>
                      <i className="fas fa-calendar-check mr-1"></i>
                      {formatDate(book.returnDate)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book Detail Modal */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedBook.title}</h2>
                  <button 
                    onClick={handleCloseDetail}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Publisher</h3>
                      <p className="text-lg text-gray-800">{selectedBook.publisher?.name || 'N/A'}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Supplier</h3>
                      <p className="text-lg text-gray-800">{selectedBook.supplier?.name || 'N/A'}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Available Copies</h3>
                      <p className="text-lg font-semibold text-gray-800">{selectedBook.availableCopies}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Borrow Date</h3>
                      <p className="text-lg text-gray-800">{formatDate(selectedBook.borrowDate)}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Return Date</h3>
                      <p className="text-lg text-gray-800">{formatDate(selectedBook.returnDate)}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Status</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedBook.availableCopies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {selectedBook.availableCopies > 0 ? 'Available' : 'Checked Out'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Actions</h3>
                  <div className="flex space-x-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center">
                      <i className="fas fa-edit mr-2"></i> Edit
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center">
                      <i className="fas fa-exchange-alt mr-2"></i> Borrow
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center">
                      <i className="fas fa-times mr-2"></i> Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-12">
          <p>Book Management System • {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default BookManagementSystem;
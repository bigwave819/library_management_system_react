import React from 'react';
import { LuBookOpen, LuUsers, LuStore, LuShield, LuStar, LuTruck } from "react-icons/lu";

const Home = () => {
  const features = [
    {
      icon: <LuBookOpen className="w-8 h-8" />,
      title: "Wide Book Selection",
      description: "Thousands of books across all genres from bestsellers to rare finds"
    },
    {
      icon: <LuUsers className="w-8 h-8" />,
      title: "Community Hub",
      description: "Join our reading community and participate in book clubs and events"
    },
    {
      icon: <LuStore className="w-8 h-8" />,
      title: "Local & International",
      description: "Support local authors while accessing global publications"
    }
  ];

  const stats = [
    {
      icon: <LuStar className="w-6 h-6" />,
      number: "10K+",
      label: "Happy Readers"
    },
    {
      icon: <LuBookOpen className="w-6 h-6" />,
      number: "25K+",
      label: "Books Available"
    },
    {
      icon: <LuTruck className="w-6 h-6" />,
      number: "24/7",
      label: "Delivery Service"
    },
    {
      icon: <LuShield className="w-6 h-6" />,
      number: "100%",
      label: "Secure Payment"
    }
  ];

  return (
    <div className='w-full min-h-screen'>
      {/* Hero Section */}
      <section className='w-full min-h-[80vh] flex md:flex-row flex-col justify-center items-center px-6 md:px-12 lg:px-24 py-16 bg-gradient-to-br from-blue-50 to-indigo-100'>
        <div className='w-full md:w-1/2 space-y-6 md:pr-8'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
            Discover Your Next <span className='text-blue-600'>Favorite Book</span>
          </h1>
          <p className='text-lg text-gray-600 leading-relaxed'>
            Welcome to Rwanda's premier bookstore experience. We connect readers with 
            amazing stories, local authors, and a community passionate about literature. 
            Explore our curated collection and embark on your next reading adventure.
          </p>
          <div className='flex flex-wrap gap-4'>
            <button className='bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105'>
              Explore Books
            </button>
            <button className='border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300'>
              Join Community
            </button>
          </div>
        </div>
        
        <div className='w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0'>
          <div className='relative'>
            <img 
              src='/read.jpg' 
              alt='Person reading a book' 
              className='w-80 h-80 md:w-96 md:h-96 rounded-2xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500'
            />
            <div className='absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 transform rotate-3'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-blue-600'>📚 5,000+</div>
                <div className='text-sm text-gray-600'>Books Added Monthly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='w-full py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Why Choose BookStore RW?
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              We're more than just a bookstore - we're a gateway to knowledge, 
              imagination, and community connection.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <div 
                key={index}
                className='bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2'
              >
                <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='w-full py-16 bg-gradient-to-r from-blue-600 to-indigo-700'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center text-white'>
                <div className='w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  {stat.icon}
                </div>
                <div className='text-3xl md:text-4xl font-bold mb-2'>{stat.number}</div>
                <div className='text-blue-100 font-medium'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
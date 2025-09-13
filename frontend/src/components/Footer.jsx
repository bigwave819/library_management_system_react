import { useState } from "react";
import { LuInstagram, LuFacebook, LuTwitter, LuYoutube, LuLocateFixed, LuPhone, LuMail, LuSend } from "react-icons/lu";
import { Link } from "react-router-dom";

const Footer = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const data = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Book",
      path: "/books",
    },
    {
      id: 3,
      name: "Publisher",
      path: "/publishers",
    },
    {
      id: 4,
      name: "Supplier",
      path: "/suppliers",
    },
  ];

  const accessing = [
    {
        id: 1,
        icon: <LuPhone className="p-3 rounded-full bg-blue-500/20 text-blue-300"/>,
        title: "Phone Number",
        decription: '+250 798 342 542'
    },
    {
        id: 2,
        icon: <LuLocateFixed className="p-3 rounded-full bg-blue-500/20 text-blue-300"/>,
        title: "Location",
        decription: 'KN str878'
    },
    {
        id: 3,
        icon: <LuMail className="p-3 rounded-full bg-blue-500/20 text-blue-300"/>,
        title: "Email",
        decription: 'waveb6133@gmail.com'
    },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-blue-950 to-blue-900 px-6 md:px-10 py-8">
      {/** useful Links Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white mb-4">Quick Links</h2>
          <div className="space-y-2">
            {data.map((link) => (
              <div key={link.id}>
                <Link 
                  to={link.path} 
                  className="font-light text-gray-300 hover:text-white transition-colors duration-200 block py-1"
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 mb-4">
            <h2 className="text-lg font-bold text-white mb-4">How to access us?</h2>
            {
                accessing.map((a) => 
                    <div key={a.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                            {a.icon}
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-200 text-sm">{a.title}</h4>
                            <p className="text-gray-300 text-sm mt-1">{a.decription}</p>
                        </div>
                    </div>
                )
            }
        </div>

        {/** About Area */}
        <div className="flex-col">
          <h2 className="text-lg font-bold text-white mb-4">About Us</h2>
          <p className="text-gray-300 font-light text-sm leading-relaxed">
            BookStore RW is your premier destination for quality books in Rwanda. 
            We connect readers with publishers and suppliers to bring the best literature 
            to your doorstep.
          </p>
        </div>

        {/** Contact Area */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Get In Touch</h2>
          <form className="space-y-3">
            <div className="space-y-3">
              <input
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Your Name"
                type="text"
                required
                className="w-full bg-blue-800/30 border border-blue-600/30 rounded-lg px-4 py-3 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                type="email"
                required
                className="w-full bg-blue-800/30 border border-blue-600/30 rounded-lg px-4 py-3 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message here..."
                rows={3}
                required
                className="w-full bg-blue-800/30 border border-blue-600/30 rounded-lg px-4 py-3 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group">
              Send Message
              <LuSend className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </form>
        </div>
      </div>

      <hr className="border-blue-700/50 my-6" />
      
      {/** Copyright and Social Media Area */}
      <div className="flex flex-col md:flex-row justify-between items-center py-4 max-w-7xl mx-auto">
        <div className="mb-4 md:mb-0">
          <p className="text-blue-300 text-sm font-light">
            © {new Date().getFullYear()} BookStore RW. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          {[
            { icon: <LuInstagram size={18} />, color: "hover:text-pink-400" },
            { icon: <LuFacebook size={18} />, color: "hover:text-blue-400" },
            { icon: <LuTwitter size={18} />, color: "hover:text-sky-400" },
            { icon: <LuYoutube size={18} />, color: "hover:text-red-400" }
          ].map((social, index) => (
            <a
              key={index}
              href="#"
              className={`text-blue-300 p-2 rounded-full bg-blue-800/30 hover:bg-blue-700/50 transition-all duration-300 ${social.color}`}
              aria-label={`Social media link`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
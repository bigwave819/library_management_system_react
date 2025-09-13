import { Link } from "react-router-dom"



const data = [
    {
        id: 1,
        name: "Home",
        path: "/"
    },
    {
        id: 2,
        name: "Book",
        path: "/books"
    },
    {
        id: 3,
        name: "Publisher",
        path: "/publishers"
    },
    {
        id: 4,
        name: "Supplier",
        path: "/suppliers"
    },
]

const Navbar = () => {
  return (
    <header className="w-full px-10 bg-transparent">
        <nav className="flex justify-between mt-7">
            <div className="inline-flex mt-[-12px]">
                <img src="/store.png" alt="logo" className="w-20 h-20 mt-[-20px]"/>
                <h2 className="text-3xl font-bold">BookStore</h2>
            </div>

            <div className="flex space-x-5">
                { data.map((link) => 
                    <ul key={link.id}>
                        <li>
                            <Link to={link.path} className="font-semibold">{link.name}</Link>
                        </li>
                    </ul>
                )}
            </div>

            <div>
                <Link to={`/login`} className="py-2 px-4 bg-blue-500 hover:bg-blue-700 cursor-pointer text-white">Log In</Link>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
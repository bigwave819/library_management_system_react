import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('') 
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await axios.post("http:localhost:7000/api/users/login", { email, password })

      if (!res.ok) {
        setError(error?.message)
      }

      const data = res.json()
      console.log(data);
      
      setLoading(false)
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-gray-50 p-5'>
      <div className='w-3xl max-w-3xl shadow-lg p-10 bg-white'>
        <h1 className="text-3xl font-bold mb-4">Log In</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-4">
            <label className="text-gray-400">Email</label>
            <input
              name='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className="w-full py-2 px-4 focus:outline-none ring-1 ring-slate-200 mt-4"
            />
          </div>
          <div className="space-y-4">
            <label className="text-gray-400">Username</label>
            <input
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className="w-full py-2 px-4 focus:outline-none ring-1 ring-slate-200 mt-4"
            />
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 text-white cursor-pointer">{ loading ? "Loading" : "Sign Up"}</button>
          </div>
          <div>
            <p>Don't have an Account <Link to={`/register`} className="text-violet-900">Sign Up Here!</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
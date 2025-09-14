import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";


const CreatePublisher = () => {
  const [ name, setName ] = useState('')
  const [ contactInfo, setContactInfo ] = useState('')
  const [ error, setError ] = useState(null)
  const [ loading,setLoading ] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      setLoading(true)
      await axios.post("http://localhost:7000/api/publisher/add", { name, contactInfo })
      navigate("/publishers")
    } catch (error) {
      setError("failed to add the supplier")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <h2 className="font-bold text-2xl">Loading ....</h2>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/5 flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">Add Supplier</h1>
        <p className="text-slate-400">You can now add the suppplier of the book<br/> store Rwanda</p>
      </div>
      { error && <div>
        <h1>{error}</h1>
      </div> }
      <div className="md:w-3xl max-w-3xl shadow-lg p-10 mx-auto">
        <form onSubmit={() => handleSubmit()} className="space-y-3">
          <div>
            <label>Publisher Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="w-full px-5 py-1 ring-1 ring-slate-100 focus:outline-none"
            />
          </div>
          <div>
            <label>Contact Info</label>
            <input 
              type="text" 
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              name="name"
              className="w-full px-5 py-1 ring-1 ring-slate-100 focus:outline-none"
            />
          </div>
          <button className="w-full bg-blue-500 py-1 cursor-pointer text-white">submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePublisher
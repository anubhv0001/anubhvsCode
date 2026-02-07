import { useEffect,useState } from "react";
import "./App.css"

function App(){

  const [users,setUsers]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [search,setSearch]=useState("");



  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res)=>{
      if (!res.ok){
        throw new Error("Failed to fetch users")
      }
      return res.json();
    })
    .then((data)=>{
      setUsers(data);
      setLoading(false);
    })

  },[])


   const filteredUsers=users.filter((user)=>
  user.name.toLowerCase().includes(search.toLowerCase())||
   user.email.toLowerCase().includes(search.toLowerCase)
  );

  if (loading) return <h2>Loading users...</h2>
  if (error)  return <h2>Error:</h2>

  return (
    <div className="app">
      <h1>User directory</h1>
      <input type="text"placeholder="Search by name or email"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />
      {filteredUsers.length===0&&<p>No users found</p>}


      {filteredUsers.map((user)=>(
          <div className="card"key={user.id}>

        <h3>{user.name}</h3>
        <p>{user.email}</p>
          </div>
      ))}
    </div>
  )
}
export default App;
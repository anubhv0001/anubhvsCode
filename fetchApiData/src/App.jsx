import { useEffect,useState } from "react";
import "./App.css"

function App(){

  const [users,setUsers]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);


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

  if (loading) return <h2>Loading users...</h2>
  if (error)  return <h2>Error:</h2>

  return (
    <div className="app">
      <h1>User directory</h1>

      {users.map((user)=>(
          <div className="card"key={user.id}>

        <h3>{user.name}</h3>
        <p>{user.email}</p>
          </div>
      ))}
    </div>
  )
}
export default App;
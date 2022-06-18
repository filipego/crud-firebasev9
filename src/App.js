
import './App.css';
import { useEffect, useState, useRef } from "react"
import { db } from "./firebase.config"
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore"

function App() {
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState(0)
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, 'users')
  const nameRef = useRef(null);
  const ageRef = useRef(null);



  // Send Data from Database

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) })
    nameRef.current.value = "";
    ageRef.current.value = "";

  }


  // Update something from the database

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = { age: age + 1 }
    await updateDoc(userDoc, newFields)
  }

  // Delete User

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  // Get Data from Database
  /* 
    useEffect(() => {
      const getUsers = async () => {
        const data = await getDocs(usersCollectionRef)
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
  
      getUsers();
    }, []) */

  // Get Data from Database Live

  useEffect(() => onSnapshot(collection(db, 'users'), (snapshot) =>
    setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  ), [])


  return (
    <div className="App">
      <input ref={nameRef} type="text" placeholder='name' onChange={(e) => { setNewName(e.target.value) }} />
      <input ref={ageRef} type="number" placeholder='age' onChange={(e) => { setNewAge(e.target.value) }} />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div key="user.id">
            <h2> {user.name}</h2>
            <p>{user.age}</p>
            <p> {user.id}</p>
            <button onClick={() => { updateUser(user.id, user.age) }}>Increase age</button>
            <button onClick={() => { deleteUser(user.id) }}>Delete User</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;

import axios from "axios";
import { useEffect, useState } from "react";
import Form, { UserData } from "./Form";

type User = {
  id?: number;
  firstName?: string;
  lastName?: string;
  age?: number;
};

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: fetchedUsers } = await axios.get<User[]>("http://localhost:3000/users");
        setUsers(fetchedUsers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const addUser = async (userData: UserData) => {
    try {
      await axios.post("http://localhost:3000/users", userData);
      const updatedUsers = [...users, userData];
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Users List</h1>
      {users.map((user, i) => (
        <div className="flex items-center gap-x-4" key={i}>
          <ul>
            <li>First Name: {user.firstName}</li>
            <li>Last Name: {user.lastName}</li>
            <li>Age: {user.age}</li>
          </ul>
          <button className="btn btn-outline btn-error" onClick={() => deleteUser(Number(user.id))}>
            Delete
          </button>
        </div>
      ))}
      <Form addUser={addUser} />
    </div>
  );
};

export default App;

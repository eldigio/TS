import axios from "axios";
import { useEffect, useState } from "react";

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
      const { data: users } = await axios.get<User[]>("http://localhost:3000/users");
      setUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1>Users List</h1>
      {users.map((user, i) => {
        return (
          <ul key={i}>
            <li>First Name: {user.firstName}</li>
            <li>Last Name: {user.lastName}</li>
            <li>Age: {user.age}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default App;

import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import UserForm, { UserData } from "./components/UserForm";
import { env } from "./utils/env";

export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();

  const { VITE_REST_API_URL } = env;

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data: users } = await axios.get<User[]>(`${VITE_REST_API_URL}/users`);

        setUsers(users);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  async function addUser(newUserData: UserData) {
    try {
      const { data: user } = await axios.post<User>(`${VITE_REST_API_URL}/users`, { newUserData });

      if (user.id) setUsers([...users, { id: user.id, ...newUserData }]);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteUser(userId: string) {
    try {
      const { data: user } = await axios.delete<User>(`${VITE_REST_API_URL}/users/${userId}`);

      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.log(err);
    }
  }

  async function updateUser(updateUser: User) {
    try {
      await axios.put(`${VITE_REST_API_URL}/users/${updateUser.id}`, { updateUser });

      setUsers(users.map((user) => (user.id === updateUser.id ? updateUser : user)));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-5 p-5 items-center">
        {loading ? (
          <>
            <div className="skeleton max-w-sm w-full h96"></div>
            <div className="skeleton max-w-sm w-full h96"></div>
          </>
        ) : (
          <>
            <div className="card max-w-sm w-full bg-base-200 shadow-xl">
              <div className="card-body gap-4">
                <h2 className="card-title">Users List</h2>
                <ul className="flex flex-col gap-4">
                  {users.length ? (
                    users.map((user, index) => (
                      <li key={index} className="card bg-base-300 flex-row gap-3 items-center p-4 justify-between">
                        <div className="flex flex-col">
                          <p>
                            <strong>{user.firstName}</strong> {user.lastName}
                          </p>
                          <small className="text-gray-500">{user.age} years old</small>
                        </div>
                        <div className="flex gap-2">
                          <div className="tooltip" data-edit="Edit">
                            <button className="btn btn-ghost text-white" onClick={() => setCurrentUser(user)}>
                              <PencilIcon className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="tooltip" data-edit="Delete">
                            <button className="btn btn-error text-white" onClick={() => user.id && deleteUser(user.id)}>
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>No Users</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="card max-w-sm w-full bg-base-200 shadow-xl">
              <div className="card-body gap-4">
                <h2 className="card-title">{currentUser ? "Edit User" : "Add User"}</h2>
                <UserForm
                  currentData={currentUser}
                  onSubmit={(newUserData) => (currentUser ? updateUser(newUserData) : addUser(newUserData))}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;

import { CheckCircleIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import UserForm, { UserData } from "./components/UserForm";
import { env } from "./utils/env";

export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
};

const App = () => {
  const [toastMessage, setToastMessage] = useState("");

  const [initLoading, setInitLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();

  const { VITE_REST_API_URL } = env;

  useEffect(() => {
    const getAllUsers = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const { data: fetchedUsers } = await axios.get<User[]>(`${VITE_REST_API_URL}/users`);

        setUsers(fetchedUsers);
        setInitLoading(false);
      } catch (err) {
        setInitLoading(false);
      }
    };

    getAllUsers();
  }, []);

  async function addUser(newUserData: UserData) {
    setCurrentUser(newUserData);
    setFetchLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const { data: user } = await axios.post<User>(`${VITE_REST_API_URL}/users`, newUserData);

      if (user.id) setUsers([...users, { id: user.id, ...newUserData }]);
      setFetchLoading(false);
      setCurrentUser(undefined);
      setToastMessage("User added successfully");
      setTimeout(() => setToastMessage(""), 2500);
    } catch (err) {
      setFetchLoading(false);
      console.log(err);
    }
  }

  async function deleteUser(userId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await axios.delete<User>(`${VITE_REST_API_URL}/users/${userId}`);

      setUsers(users.filter((user) => user.id !== userId));
      setToastMessage("User deleted successfully");
      setTimeout(() => setToastMessage(""), 2500);
    } catch (err) {
      setFetchLoading(false);
      console.log(err);
    }
  }

  async function updateUser(updateUser: User) {
    setFetchLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await axios.put(`${VITE_REST_API_URL}/users/${updateUser.id}`, updateUser);

      setUsers(users.map((user) => (user.id === updateUser.id ? updateUser : user)));
      setFetchLoading(false);
      setCurrentUser(undefined);
      setToastMessage("User updated successfully");
      setTimeout(() => setToastMessage(""), 2500);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-5 p-5 justify-center md:items-start items-center">
        {initLoading ? (
          <>
            <div className="skeleton max-w-sm w-full h-96"></div>
            <div className="skeleton max-w-sm w-full h-96"></div>
          </>
        ) : (
          <>
            <div className="card max-w-sm w-full bg-base-200 shadow-xl">
              <div className="card-body gap-4">
                <h2 className="card-title">Users list</h2>
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
                          <div className="tooltip" data-tip="Edit">
                            <button className="btn btn-outline btn-warning" onClick={() => setCurrentUser(user)}>
                              <PencilSquareIcon className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="tooltip" data-tip="Delete">
                            <button className="btn btn-outline btn-error" onClick={() => user.id && deleteUser(user.id)}>
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>No users</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="card max-w-sm w-full bg-base-200 shadow-xl">
              <div className="card-body gap-4">
                <h2 className="card-title">{currentUser ? "Edit user" : "Add user"}</h2>
                <UserForm
                  loading={fetchLoading}
                  currentData={currentUser}
                  onSubmit={(newUserData) => (currentUser ? updateUser(newUserData) : addUser(newUserData))}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {toastMessage && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <CheckCircleIcon className="w-5 h-5" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default App;

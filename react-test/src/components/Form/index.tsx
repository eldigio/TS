import { ChangeEvent, useState } from "react";

export type UserData = {
  firstName?: string;
  lastName?: string;
  age?: number;
};

function Form({ addUser }: { addUser: (userData: UserData) => void }) {
  const [userData, setUserData] = useState<UserData>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleAddUser = () => {
    if (userData?.firstName && userData?.lastName && userData?.age) {
      addUser(userData);
      setUserData({
        firstName: "",
        lastName: "",
        age: 0,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 mx-5 my-5">
        <div className="card bg-neutral text-neutral-content">
          <div className="card-body">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input input-bordered"
              onChange={handleInputChange}
              value={userData?.firstName || ""}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input input-bordered"
              onChange={handleInputChange}
              value={userData?.lastName || ""}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="input input-bordered"
              onChange={handleInputChange}
              value={userData?.age || ""}
            />
            <button className="btn btn-outline btn-primary" onClick={handleAddUser}>
              Add User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;

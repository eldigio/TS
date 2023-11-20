import { ChangeEvent, useEffect, useState } from "react";
import { User } from "../App";

export type UserData = {
  firstName?: string;
  lastName?: string;
  age?: number;
};

type UserFormPros = {
  currentData?: User;
  onSubmit: (newUserData: UserData) => void;
};

const UserForm = ({ currentData, onSubmit }: UserFormPros) => {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    setUserData(currentData);
  }, [currentData]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setUserData({ ...userData, [name]: value });
  }

  return (
    <form className="flex flex-col gap-3">
      <div className="form-control w-full max-w-xs">
        <label htmlFor="" className="label">
          <span className="label-text">First Name</span>
        </label>
        <input
          type="text"
          placeholder="E.g. John"
          className="input input-bordered w-full max-w-xs"
          name="firstName"
          value={userData?.firstName || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="" className="label">
          <span className="label-text">Last Name</span>
        </label>
        <input
          type="text"
          placeholder="E.g. Doe"
          className="input input-bordered w-full max-w-xs"
          name="lastName"
          value={userData?.lastName || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label htmlFor="" className="label">
          <span className="label-text">Age</span>
        </label>
        <input
          type="number"
          placeholder="E.g. 27"
          className="input input-bordered w-full max-w-xs"
          name="age"
          value={userData?.age || ""}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="btn btn-primary mt-5"
        onClick={(e) => {
          e.preventDefault();
          userData && onSubmit(userData);
        }}
      >
        {currentData ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default UserForm;

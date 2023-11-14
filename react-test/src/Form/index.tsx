import { DateTime } from "luxon";
import { ChangeEvent, useState } from "react";

type UserData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
};

function Form() {
  const [userData, setUserData] = useState<UserData>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: name === "dateOfBirth" ? DateTime.fromISO(value).toLocaleString(DateTime.DATE_SHORT, { locale: "fr" }) : value,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-5 mx-5 my-5">
        <div className="card bg-neutral text-neutral-content">
          <div className="card-body">
            <input type="text" name="firstName" placeholder="First Name" className="input input-bordered" onChange={handleInputChange} />
            <input type="text" name="lastName" placeholder="Last Name" className="input input-bordered" onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" className="input input-bordered" onChange={handleInputChange} />
            <input type="date" name="dateOfBirth" className="input input-bordered" onChange={handleInputChange} />
          </div>
        </div>

        <div className="card bg-neutral text-neutral-content">
          <div className="card-body">
            <ul>
              <li>
                <strong>First Name: </strong>
                <span>{userData?.firstName}</span>
              </li>
              <li>
                <strong>Last Name: </strong>
                <span>{userData?.lastName}</span>
              </li>
              <li>
                <strong>Email: </strong>
                <span>{userData?.email}</span>
              </li>
              <li>
                <strong>Date of Birth: </strong>
                <span>{userData?.dateOfBirth}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;

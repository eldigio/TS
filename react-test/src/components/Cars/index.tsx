import { ChangeEvent, useEffect, useState } from "react";

type Car = {
  name?: string;
  number?: string;
};

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState<Car>();

  useEffect(() => {
    console.log(cars);
  }, [cars]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setNewCar({ ...newCar, [name]: value });
  };

  const addCarToCars = () => {
    newCar && setCars([...cars, newCar]);

    setNewCar({});
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>Cars List</h1>
      <ul>
        {cars.map(({ name, number }, i) => {
          return (
            <li key={i}>
              {name}, {number}
            </li>
          );
        })}
      </ul>

      <input
        type="text"
        name="name"
        placeholder="Name"
        className="input input-bordered w-full max-w-xs"
        value={newCar?.name || ""}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="number"
        placeholder="Number"
        className="input input-bordered w-full max-w-xs"
        value={newCar?.number || ""}
        onChange={handleInputChange}
      />
      <button className="btn btn-outline btn-primary max-w-xs" onClick={addCarToCars}>
        Add new Car
      </button>
    </div>
  );
};

export default Cars;

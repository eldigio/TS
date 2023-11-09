export * as DOM from "./utils";

export interface IField {
  type?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  textContent?: string;
}

export type User = {
  firstName: string;
  lastName: string;
  age: number;
  id: number;
};

export type Task = {
  taskName: string;
  assignTo: number;
  expiryDate: string;
  state: number;
  id: number;
};

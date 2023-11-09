import axios from "axios";
import { IField } from ".";

export const CE = (tag: string, options: any, children?: Element[]) => {
  const element = document.createElement(tag);

  for (const [option, value] of Object.entries(options)) {
    (element as any)[option] = value;
  }

  children?.forEach((child) => child && element.append(child));

  return element;
};

export const root = (children: Element[]) => {
  children.forEach((child) => child && document.querySelector<HTMLDivElement>("#app")?.appendChild(child));
};

export const div = (options: Partial<HTMLDivElement>, children?: Element[]) => CE("div", options, children);

export const h2 = (options: Partial<HTMLHeadingElement>, children?: Element[]) => CE("h2", options, children);

export const form = (options: Partial<HTMLFormElement>, children?: Element[]) => CE("form", options, children);

export const input = (options: Partial<HTMLInputElement>, children?: Element[]) => CE("input", options, children);

export const button = (options: Partial<HTMLButtonElement>, children?: Element[]) => CE("button", options, children);

export const ul = (options: Partial<HTMLUListElement>, children?: Element[]) => CE("ul", options, children);

export const li = (options: Partial<HTMLLIElement>, children?: Element[]) => CE("li", options, children);

export const a = (options: Partial<HTMLAnchorElement>, children?: Element[]) => CE("a", options, children);

export const span = (options: Partial<HTMLSpanElement>, children?: Element[]) => CE("span", options, children);

export const addBtn = ({ id, onclick }: { id: string; onclick: any }) =>
  button({ className: "btn btn-outline btn-primary", textContent: "submit", id, onclick });

type User = {
  firstName: string;
  lastName: string;
  age: number;
  id: number;
};

const avatar = (firstName: string, lastName: string) => {
  return div({ className: "avatar placeholder" }, [
    div({ className: "bg-primary text-neutral-content rounded-full w-12" }, [
      span({ textContent: firstName.charAt(0) + lastName.charAt(0) }),
    ]),
  ]);
};

const userDetail = (firstName: string, lastName: string, age: number) => {
  return div({}, [
    div({}, [
      span({ className: "font-bold", textContent: firstName, id: "firstName" }),
      span({ className: "font-bold", textContent: " " }),
      span({ className: "font-bold", textContent: lastName, id: "lastName" }),
    ]),
    div({}, [span({ className: "text-xs text-slate-500", textContent: "Age: " + age, id: "age" })]),
  ]);
};

const createUserDetail = (user: User) => {
  return li({ id: `user-${user.id}` }, [
    a({ className: "flex justify-between" }, [
      avatar(user.firstName, user.lastName),
      userDetail(user.firstName, user.lastName, user.age),
      div({ className: "flex gap-x-2" }, [
        button({
          className: "btn btn-outline btn-warning",
          textContent: "Edit",
          onclick: async () => await updateUser(user.id),
        }),
        button({
          className: "btn btn-outline btn-error",
          textContent: "Remove",
          onclick: async () => await deleteUser(user.id),
        }),
      ]),
    ]),
  ]);
};

const getUserDetails = (): User => {
  return {
    firstName: document.querySelector<HTMLFormElement>("#formFirstName")!.value,
    lastName: document.querySelector<HTMLFormElement>("#formLastName")!.value,
    age: Number(document.querySelector<HTMLInputElement>("#formAge")!.value),
    id: Number(document.querySelector<HTMLInputElement>("#formId")?.value),
  };
};

const resetInputFields = () => {
  document.querySelector<HTMLInputElement>("#formFirstName")!.value = "";
  document.querySelector<HTMLInputElement>("#formLastName")!.value = "";
  document.querySelector<HTMLInputElement>("#formAge")!.value = "";
  document.querySelector<HTMLButtonElement>("#formSubmit")!.textContent = "submit";
};

const setInputFields = (data: User) => {
  document.querySelector<HTMLInputElement>("#formFirstName")!.value = data.firstName;
  document.querySelector<HTMLInputElement>("#formLastName")!.value = data.lastName;
  document.querySelector<HTMLInputElement>("#formAge")!.value = String(data.age);
  document.querySelector<HTMLButtonElement>("#formSubmit")!.textContent = "update";

  document
    .querySelector<HTMLFormElement>("#newUser")
    ?.children[0].appendChild(input({ type: "hidden", id: "formId", value: String(data.id) }));
};

const setSpanFields = (user: User) => {
  document.querySelector<HTMLLIElement>(`li#user-${user.id}`)!.querySelector<HTMLSpanElement>("#firstName")!.textContent = user.firstName;
  document.querySelector<HTMLLIElement>(`li#user-${user.id}`)!.querySelector<HTMLSpanElement>("#lastName")!.textContent = user.lastName;
  document.querySelector<HTMLLIElement>(`li#user-${user.id}`)!.querySelector<HTMLSpanElement>("#age")!.textContent =
    "Age: " + String(user.age);
};

export async function addUser(event: MouseEvent | SubmitEvent) {
  event.preventDefault();
  const type = document.querySelector<HTMLButtonElement>("#formSubmit")!.textContent;

  const userDetails = getUserDetails();

  if (type === "submit") {
    await axios.post("http://localhost:3000/users", userDetails, { headers: { "Content-Type": "application/json" } });

    document.querySelector("#usersList")?.appendChild(createUserDetail(userDetails));
  }

  if (type === "update") {
    await axios.patch(`http://localhost:3000/users/${userDetails.id}`, userDetails, { headers: { "Content-Type": "application/json" } });

    setSpanFields(userDetails);
  }

  document.querySelector<HTMLFormElement>("#newUser")?.querySelector("#formId")?.remove();
  resetInputFields();
}

export async function deleteUser(id: number) {
  await axios.delete(`http://localhost:3000/users/${id}`);

  document.querySelector<HTMLLIElement>(`li#user-${id}`)!.remove();
}

async function updateUser(id: number) {
  const { data } = await axios.get<User>(`http://localhost:3000/users/${id}`);

  setInputFields(data);
}

export async function allUsers() {
  const { data } = await axios.get<User[]>("http://localhost:3000/users");

  const list = ul({ className: "menu bg-base-200 w-full rounded-box gap-y-2", id: "usersList" });

  for (const user of data) list.appendChild(createUserDetail(user));

  return list;
}

export function userForm(fields: IField[]) {
  const inputContainer = div({ className: "flex gap-2", id: "inputContainer" });

  for (const { type, placeholder, className, id } of fields)
    inputContainer.appendChild(
      input({ type: !type ? "text" : type, placeholder, className: !className ? "input w-full max-w-xs" : className, id })
    );

  return inputContainer;
}

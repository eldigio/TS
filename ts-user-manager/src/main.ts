import { DOM, IField } from "../lib";
import { addUser, allUsers, userForm } from "../lib/utils";
import "./style.css";

const userFormFields: IField[] = [
  { placeholder: "First Name", id: "formFirstName" },
  { placeholder: "Last Name", id: "formLastName" },
  { placeholder: "Person Age", id: "formAge", type: "number" },
];

DOM.root([
  DOM.div({ className: "container flex flex-col gap-y-8 pt-8" }, [
    DOM.div({ className: "card bg-base-300 w-4/5 mx-auto shadow-lg" }, [
      DOM.div({ className: "card-body" }, [
        DOM.h2({ className: "card-title", textContent: "New User" }),
        DOM.form({ className: "flex flex-col gap-y-4", id: "newUser", onsubmit: async (e) => await addUser(e) }, [
          userForm(userFormFields),
          DOM.addBtn({ id: "formSubmit", onclick: async (e: MouseEvent) => await addUser(e) }),
        ]),
      ]),
    ]),
    DOM.div({ className: "card bg-base-300 w-4/5 mx-auto shadow-lg" }, [
      DOM.div({ className: "card-body" }, [
        DOM.h2({ className: "card-title", textContent: "All Users" }),
        DOM.div({ className: "bg-base-200 rounded-box" }, [await allUsers()]),
      ]),
    ]),
  ]),
]);

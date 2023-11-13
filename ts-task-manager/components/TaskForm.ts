import axios from "axios";
import { DOM, IField, User } from "../lib/index";
import { toast } from "../lib/utils";

const fields: IField[] = [
  { placeholder: "Task Name", id: "formTaskName" },
  { textContent: "Assign To", id: "formAssignTo" },
];

export async function TaskForm() {
  try {
    const inputContainer = DOM.div({ className: "flex items-center gap-2", id: "inputContainer" });

    const { data } = await axios.get<User[]>("http://localhost:3000/users");
    const dropdown = DOM.select({ className: "select", id: "formAssignTo" }, [
      DOM.option({
        disabled: true,
        selected: true,
        textContent: "Assign To",
      }),
    ]);

    for (const { firstName, lastName } of data) dropdown.appendChild(DOM.option({ textContent: firstName + " " + lastName }));

    for (const { type, placeholder, className, id, textContent } of fields) {
      if (placeholder)
        inputContainer.appendChild(
          DOM.input({ type: !type ? "text" : type, placeholder, className: !className ? "input w-full" : className, id })
        );
      if (textContent) inputContainer.appendChild(dropdown);
    }

    return inputContainer;
  } catch (err) {
    await toast("error", (err as any).message);
    throw new Error((err as any).message);
  }
}

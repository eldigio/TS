/* installed packages */
import axios from "axios";
import { DateTime } from "luxon";
import random from "random";

/* Types */
import { Task } from ".";

/* Components */
import { TaskDetail } from "../components/TaskDetail";

/* Icons */
import { check, xMark } from "./icons";

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

export const select = (options: Partial<HTMLSelectElement>, children?: Element[]) => CE("select", options, children);

export const option = (options: Partial<HTMLOptionElement>, children?: Element[]) => CE("option", options, children);

export const table = (options: Partial<HTMLTableElement>, children?: Element[]) => CE("table", options, children);

export const thead = (options: Partial<HTMLTableCellElement>, children?: Element[]) => CE("thead", options, children);

export const tbody = (options: Partial<HTMLTableCellElement>, children?: Element[]) => CE("tbody", options, children);

export const tr = (options: Partial<HTMLTableRowElement>, children?: Element[]) => CE("tr", options, children);

export const th = (options: Partial<HTMLTableCellElement>, children?: Element[]) => CE("th", options, children);

export const td = (options: Partial<HTMLTableColElement>, children?: Element[]) => CE("td", options, children);

export const label = (options: Partial<HTMLLabelElement>, children?: Element[]) => CE("label", options, children);

export const addBtn = ({ id, onclick, textContent = "submit" }: { id?: string; onclick?: any; textContent?: string }) =>
  button({ className: "btn btn-outline btn-primary", textContent, id, onclick });

const stringToElement = (string: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, "text/html");
  return doc.body.firstChild as Element;
};

const removeAlert = (alert: ChildNode) => {
  (alert as HTMLDivElement).classList?.add("animate-alert-out");
  alert.addEventListener("animationend", () => alert.remove());
};

const getExpiryDate = () => {
  return DateTime.now()
    .plus({ day: random.int(2, 21) })
    .setLocale("it")
    .toLocaleString({ day: "2-digit", month: "2-digit", year: "numeric" });
};

const getNewId = () => Date.now();

export const selectTaskState = (id: number, state: number) => {
  return select(
    {
      className: `select ${state === 0 && "bg-success-content"}`,
      onchange: async () => await updateTask(id, state),
    },
    [
      option({
        textContent: "Completed",
        selected: state === 0 ? true : false,
        disabled: state === 0 ? true : false,
      }),
      option({
        textContent: "In Progress",
        selected: state === 1 ? true : false,
        disabled: state === 1 ? true : false,
      }),
    ]
  );
};

const resetInputFields = () => {
  document.querySelector<HTMLInputElement>("#formTaskName")!.value = "";
  document.querySelector<HTMLSelectElement>("#formAssignTo")!.selectedIndex = 0;
};

const alert = async (type: string, message: string, wait: number = 3000) => {
  const toastContainer = document.querySelector<HTMLDivElement>("#toastContainer");

  toastContainer?.appendChild(
    div({ className: `alert alert-${type}` }, [stringToElement(type === "error" ? xMark : check), span({ textContent: message })])
  );

  if (toastContainer!.children.length > 0) {
    toastContainer?.childNodes.forEach((alert) => setTimeout(() => removeAlert(alert), wait));
  }
};

export async function updateTask(id: number, state: number) {
  document.querySelector<HTMLSelectElement>(`tr[id='${id}'] select`)?.remove();
  document
    .querySelector<HTMLSpanElement>(`tr[id='${id}'] #select`)
    ?.appendChild(span({ className: "loading loading-dots", id: "loading" }));

  await axios.patch(`http://localhost:3000/tasks/${id}`, { state: state === 0 ? 1 : 0 });
  const { data: task } = await axios.get<Task>(`http://localhost:3000/tasks/${id}`);

  document.querySelector<HTMLSpanElement>(`tr[id='${id}'] #loading`)?.remove();
  document.querySelector<HTMLTableRowElement>(`tr[id='${id}'] #select`)?.appendChild(selectTaskState(id, task.state));
}

export async function deleteTask(id: number) {
  document.querySelector<HTMLTableRowElement>(`tr[id='${id}']`)?.remove();

  await axios.delete(`http://localhost:3000/tasks/${id}`);
}

export async function addTask(event: MouseEvent | SubmitEvent) {
  event.preventDefault();

  const inputContainer = document.querySelector<HTMLInputElement>("#inputContainer");
  const taskName = inputContainer?.children.namedItem("formTaskName") as HTMLInputElement;
  const assignTo = inputContainer?.children.namedItem("formAssignTo") as HTMLSelectElement;

  if (taskName.value === "" || assignTo.value === "Assign To") return await alert("error", "Invalid task name or selected member");

  const newTaskId = getNewId();
  const newTask = {
    taskName: taskName.value,
    assignTo: assignTo.selectedIndex,
    expiryDate: getExpiryDate(),
    state: 1,
    id: newTaskId,
  };

  await axios.post("http://localhost:3000/tasks", newTask);

  document.querySelector("tbody")?.appendChild(await TaskDetail(newTask));
  resetInputFields();
  await alert("success", "Task addedd successfully!");
}

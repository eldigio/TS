/* tailwind styles */
import "./style.css";

/* main lib */
import { DOM, User } from "../lib";
import { getExpiryDate, getNewId, resetInputFields, toast } from "../lib/utils";

/* Components */
import axios from "axios";
import { AllTasks } from "../components/AllTasks";
import { TaskDetail } from "../components/TaskDetail";
import { TaskForm } from "../components/TaskForm";

export async function addTask(event: Event) {
  event.preventDefault();

  const inputContainer = document.querySelector<HTMLInputElement>("#inputContainer");
  const taskName = inputContainer?.children.namedItem("formTaskName") as HTMLInputElement;
  const assignTo = inputContainer?.children.namedItem("formAssignTo") as HTMLSelectElement;

  if (taskName.value === "" || assignTo.value === "Assign To") return await toast("error", "Invalid task name or selected member");

  const newTaskId = getNewId();
  const newTask = {
    taskName: taskName.value,
    assignTo: assignTo.selectedIndex,
    expiryDate: getExpiryDate(),
    state: 1,
    id: newTaskId,
  };

  try {
    await axios.post("http://localhost:3000/tasks", newTask);
    const { data: users } = await axios.get<User[]>("http://localhost:3000/users");
    document.querySelector("tbody")?.appendChild(TaskDetail(newTask, users));
    resetInputFields();
    await toast("success", "Task addedd successfully!");
  } catch (err) {
    await toast("error", (err as any).message);
    throw new Error((err as any).message);
  }
}

DOM.root([
  DOM.div({ className: "toast toast-top toast-end z-10", id: "toastContainer" }),
  DOM.div({ className: "container flex flex-col gap-y-8 pt-8" }, [
    DOM.div({ className: "card bg-base-300 w-4/5 mx-auto shadow-lg" }, [
      DOM.div({ className: "card-body" }, [
        DOM.h2({ className: "card-title", textContent: "New Task" }),
        DOM.form({ className: "flex flex-col gap-y-4", id: "newTask", onsubmit: async (e) => await addTask(e) }, [
          await TaskForm(),
          DOM.addBtn({ id: "formSubmit", onclick: async (e: Event) => await addTask(e) }),
        ]),
      ]),
    ]),
    DOM.div({ className: "card bg-base-300 w-4/5 mx-auto shadow-lg" }, [
      DOM.div({ className: "card-body" }, [
        DOM.h2({ className: "card-title", textContent: "All Tasks", id: "tasksTitle" }),
        DOM.div({ className: "bg-base-200 rounded-box" }, [
          DOM.div({ className: "overflow-x-auto", id: "table" }, [
            DOM.table({ className: "table" }, [
              DOM.thead({}, [
                DOM.tr({}, [
                  DOM.th({ textContent: "Task Name" }),
                  DOM.th({ textContent: "Assigned To" }),
                  DOM.th({ textContent: "Expiry Date" }),
                  DOM.th({ textContent: "Current State" }),
                ]),
              ]),
              await AllTasks(),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
]);

import axios from "axios";
import { TaskDetail } from "../components/TaskDetail";
import { DOM, Task } from "../lib/index";

export async function AllTasks() {
  const { data: tasks } = await axios.get<Task[]>("http://localhost:3000/tasks");

  const tableBody = DOM.tbody({});

  for (const { taskName, assignTo, expiryDate, state, id } of tasks) {
    tableBody.appendChild(await TaskDetail({ id, taskName, assignTo, expiryDate, state }));
  }
  return tableBody;
}

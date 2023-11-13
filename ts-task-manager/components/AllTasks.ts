import axios from "axios";
import { TaskDetail } from "../components/TaskDetail";
import { DOM, Task, User } from "../lib/index";
import { toast } from "../lib/utils";

export async function AllTasks() {
  try {
    const { data: tasks } = await axios.get<Task[]>("http://localhost:3000/tasks");
    const { data: users } = await axios.get<User[]>("http://localhost:3000/users");

    const tableBody = DOM.tbody({}, tasks.map((task) => TaskDetail(task, users)));

    return tableBody;
  } catch (err) {
    await toast("error", (err as any).message);
    throw new Error((err as any).message);
  }
}

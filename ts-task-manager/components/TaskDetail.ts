import axios from "axios";
import { DOM, Task, User } from "../lib/index";
import { selectTaskState, toast } from "../lib/utils";

export async function deleteTask(id: number) {
  try {
    document.querySelector<HTMLTableRowElement>(`tr[id='${id}']`)?.remove();

    await axios.delete(`http://localhost:3000/tasks/${id}`);
  } catch (err) {
    await toast("error", (err as any).message);
    throw new Error((err as any).message);
  }
}

export const TaskDetail = ({ id, taskName, assignTo, expiryDate, state }: Task, users: User[]) => {
  return DOM.tr({ id: String(id) }, [
    DOM.th({ textContent: taskName }),
    DOM.th({ textContent: `${users[assignTo - 1].firstName} ${users[assignTo - 1].lastName}` }),
    DOM.th({ textContent: expiryDate }),
    DOM.th({ id: "select" }, [selectTaskState(id, state)]),
    DOM.th({}, [
      DOM.button({
        className: "btn btn-outline btn-error",
        textContent: "remove",
        onclick: async () => await deleteTask(id),
      }),
    ]),
  ]);
};

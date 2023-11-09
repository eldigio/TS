import axios from "axios";
import { DOM, Task, User } from "../lib/index";
import { deleteTask, selectTaskState } from "../lib/utils";

export const TaskDetail = async ({ id, taskName, assignTo, expiryDate, state }: Task) => {
  const { data: users } = await axios.get<User[]>("http://localhost:3000/users");

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

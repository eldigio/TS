/* tailwind styles */
import "./style.css";

/* main lib */
import { DOM } from "../lib";

/* Components */
import { AllTasks } from "../components/AllTasks";
import { TaskForm } from "../components/TaskForm";

DOM.root([
  DOM.div({ className: "toast toast-top toast-end z-10", id: "toastContainer" }),
  DOM.div({ className: "container flex flex-col gap-y-8 pt-8" }, [
    DOM.div({ className: "card bg-base-300 w-4/5 mx-auto shadow-lg" }, [
      DOM.div({ className: "card-body" }, [
        DOM.h2({ className: "card-title", textContent: "New Task" }),
        DOM.form({ className: "flex flex-col gap-y-4", id: "newTask", onsubmit: async (e) => await DOM.addTask(e) }, [
          await TaskForm(),
          DOM.addBtn({ id: "formSubmit", onclick: async (e: MouseEvent) => await DOM.addTask(e) }),
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

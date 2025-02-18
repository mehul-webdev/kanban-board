const board = document.querySelector(".board");
const modal = document.querySelector("#create-task-modal");
const overlay = document.querySelector("#overlay");
const createTaskForm = document.getElementById("create-task-form");

board.addEventListener("click", (e) => {
  if (
    Array.from(e.target.classList).includes("edit-task") ||
    Array.from(e.target.classList).includes("delete-task")
  ) {
    const currentData = JSON.parse(localStorage.getItem("to-do-list"));

    const getTaskIdFrom = e.target.parentElement.parentElement;
    const currentId = getTaskIdFrom.getAttribute("data-id");
    const currentStatus = getTaskIdFrom.classList[0];
    createTaskForm.id = "edit-task-form";

    const currentTask = currentData[currentStatus].filter((ele) => {
      if (ele.id === currentId) {
        return ele;
      }
    })[0];

    if (Array.from(e.target.classList).includes("edit-task")) {
      const form = document.getElementById("edit-task-form");

      for (let element of form.elements) {
        if (element.name) {
          element.value = currentTask[element.name];
        }
      }

      const stringData = JSON.stringify(currentTask);

      localStorage.setItem("edit-task", stringData);

      modal.style.display = "block";
      overlay.style.display = "block";
    }

    if (Array.from(e.target.classList).includes("delete-task")) {
      const currentStatusData = currentData[currentStatus];

      const filteredData = currentStatusData.filter((ele) => {
        return ele.id !== currentId;
      });

      currentData[currentStatus] = filteredData;

      const event = new CustomEvent("localStorageChanged", {
        detail: currentData,
      });
      document.dispatchEvent(event);
    }
  }
});

import { handleSubmitCreateTask } from "./createTask.js";
import { updateBoard } from "./updateBoard.js";

const createTaskForm = document.getElementById("create-task-form");
const modal = document.querySelector("#create-task-modal");
const overlay = document.querySelector("#overlay");
const closeBtn = document.querySelector("#close-modal");
const createTaskBtn = document.querySelector("#create-task-btn");

// Executes on initial load to check local storage have data or not
document.addEventListener("DOMContentLoaded", () => {
  const localStorageData = localStorage.getItem("to-do-list");

  if (!localStorageData) {
    localStorage.setItem(
      "to-do-list",
      JSON.stringify({
        pending: [],
        [`in-progress`]: [],
        review: [],
        completed: [],
      })
    );
  }
});
// End of code

// Initially update or create board
document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("to-do-list"));
  updateBoard(data);
});

// To Submit Create Task Form
createTaskForm.addEventListener("submit", handleSubmitCreateTask);
// End of code

// Below code execute when local storage data changes(while create or update or delete)
document.addEventListener("localStorageChanged", onLocalStorageChange);

async function onLocalStorageChange(event) {
  const allTaskBox = document.querySelectorAll(".task-box");
  await removeAllTaskBoxes(allTaskBox);

  localStorage.setItem("to-do-list", JSON.stringify(event.detail));
  updateBoard(event.detail);
}

async function removeAllTaskBoxes(nodeList) {
  nodeList.forEach((node) => {
    node.parentNode.removeChild(node);
  });
}

// End of code

// Start: To Open and Close modal

createTaskBtn.addEventListener("click", () => {
  modal.style.display = "block";
  overlay.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  overlay.style.display = "none";
  localStorage.removeItem("edit-task");
});

// End of code

// Start: drag and drop feature

const dropzones = document.querySelectorAll(".board-box");

let dragElem = null;
let dragElemId = null;
let dragElemPrevStatus = null;
dropzones.forEach((col) => {
  col.addEventListener("dragstart", (e) => {
    dragElem = e.target;
    dragElemId = dragElem.getAttribute("data-id");
    dragElemPrevStatus = dragElem.classList[0];
  });

  col.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  col.addEventListener("drop", (e) => {
    e.preventDefault();

    if (dragElem && dragElemId) {
      const data = JSON.parse(localStorage.getItem("to-do-list"));

      const currentStatus = e.target.classList[0];

      const previousStatusData = data[dragElemPrevStatus]; // array

      const previousElement = previousStatusData.filter((ele) => {
        return ele.id === dragElemId;
      })[0];

      // to remove element from previous status array
      const removeDataFromPrevious = previousStatusData.filter((ele) => {
        return ele.id !== dragElemId;
      });

      console.log(previousElement);

      if (previousElement) {
        data[dragElemPrevStatus] = removeDataFromPrevious;

        previousElement["status"] = currentStatus;

        data[currentStatus].push(previousElement);

        dragElem = null;
        dragElemId = null;
        dragElemPrevStatus = null;

        const event = new CustomEvent("localStorageChanged", {
          detail: data,
        });
        document.dispatchEvent(event);
      }
    }
  });
});

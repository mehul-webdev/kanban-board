const pending = document.querySelector("#pending-tasks");
const inProgress = document.querySelector("#in-progress-tasks");
const review = document.querySelector("#review-tasks");
const done = document.querySelector("#done-tasks");
import { getAllTasksId, removeAllDivs } from "./helpingFunctions.js";

export const updateBoard = (data) => {
  if (!data) {
    return;
  }

  const {
    allPendingTasksId,
    allInProgressTasksId,
    reviewTasksId,
    completeTasksId,
  } = getAllTasksId();

  for (let task in data) {
    const array = data[task];

    switch (task) {
      case "pending":
        const pendingBoardDiv = pending.childNodes;
        removeAllDivs(pendingBoardDiv);

        const pendingFragment = document.createDocumentFragment();

        array.forEach((task) => {
          if (!allPendingTasksId.includes(task.id)) {
            const taskBox = createTaskBox("pending", task);
            pendingFragment.appendChild(taskBox);
          }
        });

        pending.appendChild(pendingFragment);

        break;

      case "in-progress":
        const inProgressFragment = document.createDocumentFragment();

        array.forEach((task) => {
          if (!allInProgressTasksId.includes(task.id)) {
            const taskBox = createTaskBox("in-progress", task);
            inProgressFragment.appendChild(taskBox);
          }
        });

        inProgress.appendChild(inProgressFragment);
        break;

      case "review":
        const reviewFragment = document.createDocumentFragment();

        array.forEach((task) => {
          if (!reviewTasksId.includes(task.id)) {
            const taskBox = createTaskBox("review", task);
            reviewFragment.appendChild(taskBox);
          }
        });

        review.appendChild(reviewFragment);
        break;

      case "completed":
        const completeFragment = document.createDocumentFragment();

        array.forEach((task) => {
          if (!completeTasksId.includes(task.id)) {
            const taskBox = createTaskBox("completed", task);
            completeFragment.appendChild(taskBox);
          }
        });

        done.appendChild(completeFragment);
        break;
    }
  }
};

function createTaskBox(taskType, task) {
  const createItem = document.createElement("div");
  createItem.setAttribute("class", `${taskType} task-box`);
  createItem.setAttribute("data-id", `${task.id}`);
  createItem.setAttribute("draggable", `true`);

  createItem.innerHTML = `
                    <h4 class="task-box-title">${task.title}</h4>
                    <p class="task-box-description">
                      ${task.description}
                    </p>
                    <div class="task-box-actions">
                        <i class="fa-solid fa-pen-to-square edit-task"></i>
                        <i class="fa-solid fa-trash delete-task"></i>
                    </div>
              `;

  return createItem;
}

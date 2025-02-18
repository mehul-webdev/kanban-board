const pending = document.querySelector("#pending-tasks");
const inProgress = document.querySelector("#in-progress-tasks");
const review = document.querySelector("#review-tasks");
const done = document.querySelector("#done-tasks");

export const getAllTasksId = () => {
  const allPendingTasksId = [];
  const allInProgressTasksId = [];
  const reviewTasksId = [];
  const completeTasksId = [];

  pending.querySelectorAll(".pending")?.forEach((ele) => {
    allPendingTasksId.push(ele.classList[2]);
  });

  inProgress.querySelectorAll(".in-progress")?.forEach((ele) => {
    allInProgressTasksId.push(ele.classList[2]);
  });

  review.querySelectorAll(".review")?.forEach((ele) => {
    reviewTasksId.push(ele.classList[2]);
  });

  done.querySelectorAll(".complete")?.forEach((ele) => {
    completeTasksId.push(ele.classList[2]);
  });

  return {
    allPendingTasksId,
    allInProgressTasksId,
    reviewTasksId,
    completeTasksId,
  };
};

export function removeAllDivs(nodeList) {
  nodeList.forEach((node) => {
    if (node.tagName === "DIV") {
      node.parentNode.removeChild(node);
    }
  });
}

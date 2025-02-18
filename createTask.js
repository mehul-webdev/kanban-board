const modal = document.querySelector("#create-task-modal");
const overlay = document.querySelector("#overlay");

export const handleSubmitCreateTask = (e) => {
  e.preventDefault();

  let isError = false;

  if (e.target.id === "edit-task-form") {
    const form = document.getElementById("edit-task-form");

    const editedTask = JSON.parse(localStorage.getItem("edit-task"));
    const currStatus = editedTask["status"];
    const allTasksData = JSON.parse(localStorage.getItem("to-do-list"));

    for (let element of form.elements) {
      if (element.name) {
        if (element.value === "") {
          isError = true;
          break;
        }

        editedTask[element.name] = element.value;
      }
    }

    if (!isError) {
      const getCurrentStatusData = allTasksData[currStatus];

      const getFilteredData = getCurrentStatusData.filter(
        (ele) => ele.id !== editedTask.id
      );

      const getCurrentIdData = getCurrentStatusData.filter(
        (ele) => ele.id === editedTask.id
      )[0];

      allTasksData[currStatus] = getFilteredData;

      const newStatus = editedTask["status"];
      allTasksData[newStatus].push(editedTask);

      const event = new CustomEvent("localStorageChanged", {
        detail: allTasksData,
      });
      document.dispatchEvent(event);

      localStorage.removeItem("edit-task");
      form.id = "create-task-form";
    }
  } else {
    const form = document.getElementById("create-task-form");
    const formData = {
      id: self.crypto.randomUUID(),
    };
    for (let element of form.elements) {
      if (element.name) {
        if (element.value === "") {
          isError = true;
          break;
        }
        formData[element.name] = element.value;
      }
    }

    if (!isError) {
      const boardData = JSON.parse(localStorage.getItem("to-do-list"));
      boardData[formData["status"]].push(formData);

      const event = new CustomEvent("localStorageChanged", {
        detail: boardData,
      });
      document.dispatchEvent(event);
    }
  }

  if (!isError) {
    modal.style.display = "none";
    overlay.style.display = "none";

    const form = document.getElementById(e.target.id);
    for (let element of form.elements) {
      if (element.name) {
        element.value = "";
      }
    }
  } else {
    handleError(e.target.id);
  }
};

function handleError(formId) {
  console.log("error occured");

  const form = document.getElementById(formId);

  for (let element of form.elements) {
    if (element.name) {
      if (element.value === "") {
        element.classList.remove("input");
        element.classList.add("error-input");
      } else {
        element.classList.remove("error-input");
        element.classList.add("input");
      }
    }
  }
}

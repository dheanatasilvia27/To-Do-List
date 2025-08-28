function updateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.getElementById("currentTime").innerText = now.toLocaleDateString(
    "id-ID",
    options
  );
}

setInterval(updateTime, 1000);
updateTime();

const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
const overdueList = document.getElementById("overdueList");
const deleteAllBtn = document.getElementById("deleteAllBtn");

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;
  const deadline = deadlineInput.value;

  if (taskText === "") return alert("Tulis tugas terlebih dahulu !");
  if (deadline === "") return alert("Pilih deadline untuk tugas !");

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.innerText = `${taskText} [${priority}] (Deadline: ${deadline})}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("delete-btn");

  li.dataset.deadline = deadline;
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      li.classList.add("done");
      doneList.appendChild(li);
    } else {
      li.classList.remove("done");
      todoList.appendChild(li);
    }
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  taskInput.value = "";
  deadlineInput.value = "";
});

deleteAllBtn.addEventListener("click", () => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
  overdueList.innerHTML = "";
});

setInterval(() => {
  const now = new Date();
  document.querySelectorAll("#todoList li").forEach((li) => {
    const deadline = new Date(li.dataset.deadline);
    if (now > deadline && !li.classList.contains("done")) {
      li.classList.add("overdue");
      overdueList.appendChild(li);
    }
  });
}, 30000);

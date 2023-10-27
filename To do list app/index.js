document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("tasks");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = task.text;
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.className = "delete";
            deleteButton.addEventListener("click", () => deleteTask(index));
            const editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.className = "edit";
            editButton.addEventListener("click", () => editTask(index));
            li.appendChild(deleteButton);
            li.appendChild(editButton);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const task = { text: taskText };
        tasks.push(task);
        taskInput.value = "";
        saveTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
    }

    function editTask(index) {
        const newText = prompt("Edit task:", tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText;
            saveTasks();
        }
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    renderTasks();
});

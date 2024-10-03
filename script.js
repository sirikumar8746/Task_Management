let tasks = [];
let pendingCount = 0;
let completedCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    const userName = prompt("Enter your name:");
    updateWelcomeMessage(userName);
    updateStats();
});

function updateWelcomeMessage(name) {
    const welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.textContent = `Welcome, ${name}!`;
    welcomeMessage.style.fontSize = "1.5rem";
    welcomeMessage.style.marginBottom = "20px";
    welcomeMessage.style.color = "#ff6f61";
}

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty.");
        return;
    }

    const task = {
        text: taskText,
        pending: true
    };
    tasks.push(task);
    pendingCount++;
    taskInput.value = "";
    displayTasks();
    updateStats();
}

function displayTasks(filter = null) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter === null || (filter === "pending" && task.pending) || (filter === "completed" && !task.pending)) {
            const tr = document.createElement("tr");
            tr.classList.toggle("dark-mode", document.body.classList.contains("dark-mode"));

            const taskText = document.createElement("td");
            taskText.textContent = task.text;

            const taskStatus = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = !task.pending;
            checkbox.onclick = () => toggleTaskStatus(index);
            taskStatus.appendChild(checkbox);

            const statusLabel = document.createElement("span");
            statusLabel.textContent = task.pending ? "Pending" : "Completed";
            taskStatus.appendChild(statusLabel);

            const taskActions = document.createElement("td");
            taskActions.classList.add("task-actions");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = () => editTask(index);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteTask(index);

            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            tr.appendChild(taskText);
            tr.appendChild(taskStatus);
            tr.appendChild(taskActions);
            taskList.appendChild(tr);
        }
    });
}

function toggleTaskStatus(index) {
    tasks[index].pending = !tasks[index].pending;
    if (tasks[index].pending) {
        pendingCount++;
        completedCount--;
    } else {
        pendingCount--;
        completedCount++;
    }
    displayTasks();
    updateStats();
}

function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        displayTasks();
    }
}

function deleteTask(index) {
    if (tasks[index].pending) {
        pendingCount--;
    } else {
        completedCount--;
    }
    tasks.splice(index, 1);
    displayTasks();
    updateStats();
}

function updateStats() {
    const totalTasks = tasks.length;
    const pendingPercentage = totalTasks === 0 ? 0 : (pendingCount / totalTasks) * 100;
    document.getElementById("pending-tasks").textContent = `Pending Tasks: ${Math.round(pendingPercentage)}%`;
    document.getElementById("pending-count").textContent = `${pendingCount}`;
    document.getElementById("completed-count").textContent = `${completedCount}`;
}

function showPendingTasks() {
    displayTasks("pending");
}

function showCompletedTasks() {
    displayTasks("completed");
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    displayTasks();
}

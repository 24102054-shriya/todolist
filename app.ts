class Task {
    name: string;
    completed: boolean;

    constructor(name: string) {
        this.name = name;
        this.completed = false;
    }
}

let tasks: Task[] = [];

function addTask() {
    let input = document.getElementById("taskinput") as HTMLInputElement;
    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    let newTask = new Task(taskName);
    tasks.push(newTask);

    saveTasks();
    showTasks("all");

    input.value = "";
}

function showTasks(filter: string) {
    let list = document.getElementById("tasklist") as HTMLUListElement;
    list.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        if (filter === "active" && task.completed) {
            continue;
        }

        if (filter === "completed" && !task.completed) {
            continue;
        }

        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onclick = function () {
            task.completed = checkbox.checked;
            saveTasks();
            showTasks(filter);
        };

        // Create a text node instead of an HTML element
        let text = document.createTextNode(task.name);

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";

        deleteButton.onclick = function () {
            tasks.splice(i, 1);
            saveTasks();
            showTasks(filter);
        };

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteButton);

        list.appendChild(li);
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");

    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }

    showTasks("all");
}

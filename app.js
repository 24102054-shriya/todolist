var Task = /** @class */ (function () {
    function Task(name) {
        this.name = name;
        this.completed = false;
    }
    return Task;
}());
var tasks = [];
function addTask() {
    var input = document.getElementById("taskinput");
    var taskName = input.value.trim();
    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }
    var newTask = new Task(taskName);
    tasks.push(newTask);
    saveTasks();
    showTasks("all");
    input.value = "";
}
function showTasks(filter) {
    var list = document.getElementById("tasklist");
    list.innerHTML = "";
    var _loop_1 = function (i) {
        var task = tasks[i];
        if (filter === "active" && task.completed) {
            return "continue";
        }
        if (filter === "completed" && !task.completed) {
            return "continue";
        }
        var li = document.createElement("li");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onclick = function () {
            task.completed = checkbox.checked;
            saveTasks();
            showTasks(filter);
        };
        // Create a text node instead of an HTML element
        var text = document.createTextNode(task.name);
        var deleteButton = document.createElement("button");
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
    };
    for (var i = 0; i < tasks.length; i++) {
        _loop_1(i);
    }
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    var savedTasks = localStorage.getItem("tasks");
    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }
    showTasks("all");
}

const taskInput = document.querySelector('.main__input');
const addTaskButton = document.querySelector('.main__add__button');
const tasksContainer = document.querySelector(".tasks");
const totalTasksElement = document.querySelector("#not_completed_task");
const completedTasksElement = document.querySelector("#completed_task");

let nextTaskId = 0;
let tasksData = [];

addTaskButton.addEventListener('click', addTask);

function createTaskMarkup(taskTitle) {
    return `
        <div class="main__field">
            <label>
                <input type="checkbox" id="checkbox" class="main__task_checkbox">
                <span class="custom-checkbox"></span>
            </label>
            <p class="naming__task">${taskTitle}</p>
        </div>
        <button class="button__task__edit"><img src="images/edit.png" alt=""></button>
        <button class="button__tasl__delete"><img src="images/trash.png" alt=""></button>
    `;
}

function updateTaskCounters() {
    totalTasksElement.textContent = tasksData.length; 
    const completedTasksCount = tasksData.filter(task => task.isDone).length;
    completedTasksElement.textContent = completedTasksCount; 
}

function addTask() {
    const taskTitle = taskInput.value; 
    if (taskTitle){
        nextTaskId++;
        const task = {
            'id': nextTaskId,
            'title': taskTitle,
            'isDone' : false
        }
        tasksData.push(task);
    
        const newTaskElement = document.createElement('div');
        newTaskElement.classList.add('main__task');
    
        newTaskElement.dataset.id =  nextTaskId;
        const taskMarkup = createTaskMarkup(taskTitle);
    
        newTaskElement.innerHTML = taskMarkup;
        tasksContainer.appendChild(newTaskElement);
    
        const deleteButton = newTaskElement.querySelector(".button__tasl__delete");
        const checkbox = newTaskElement.querySelector("#checkbox");
        const editButton = newTaskElement.querySelector(".button__task__edit");

        checkbox.addEventListener('change', () => toggleTaskCompletion(newTaskElement));
        deleteButton.addEventListener('click', () => deleteTask(newTaskElement));
        editButton.addEventListener('click', () => editTask(newTaskElement));
        
        taskInput.value = '';
        updateTaskCounters(); 
    }
}

function deleteTask(taskElement){
    const taskIdToDelete = Number(taskElement.dataset.id);
    tasksData = tasksData.filter(task => task.id !== taskIdToDelete);
    taskElement.remove();
    updateTaskCounters();
}

function toggleTaskCompletion(taskElement){
    const taskId = Number(taskElement.dataset.id);
    const task = tasksData.find(task => task.id === taskId);
    if (task) {
        task.isDone = taskElement.querySelector("#checkbox").checked;
        const taskNameElement = taskElement.querySelector(".naming__task");
        taskNameElement.style.textDecoration = task.isDone ? "line-through" : "none";
        updateTaskCounters();
    }
}

function editTask(taskElement) {
    const taskNameElement = taskElement.querySelector(".naming__task");
    const currentText = taskNameElement.textContent;
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = currentText;
    inputField.classList.add("edit-input");
    taskNameElement.replaceWith(inputField);
    inputField.focus();

    inputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            confirmEditTask(e, taskElement, taskNameElement, inputField);
        }
    });
}

function confirmEditTask(e, taskElement, taskNameElement, inputField){
    taskNameElement.textContent = inputField.value;
    inputField.replaceWith(taskNameElement);

    const taskId = Number(taskElement.dataset.id);
    const task = tasksData.find(task => task.id === taskId);
    if (task) {
        task.title = inputField.value;
    }
}

const showCompletedTasksButton = document.querySelector(".finished__task__tab");
const showUncompletedTasksButton = document.querySelector(".unfinished__task__tab");

showCompletedTasksButton.addEventListener('click', () => sortTasks(true));
showUncompletedTasksButton.addEventListener('click', () => sortTasks(false));

function sortTasks(showCompleted) {
    const tasks = tasksContainer.querySelectorAll(".main__task");
    tasks.forEach(taskElement => {
        const taskId = Number(taskElement.dataset.id);
        const task = tasksData.find(task => task.id === taskId);
        if (task && task.isDone !== showCompleted) {
            taskElement.classList.add("hidden");
        } else {
            taskElement.classList.remove("hidden");
        }
    });
}

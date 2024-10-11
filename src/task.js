import { myProjects, myTasks } from "./data.js";
import { getTasks, getProjects, populateTaskStorage } from './storage.js';


function addTask(task) {
    let tasks = getTasks();

    tasks.push(task);
    populateTaskStorage(tasks, 'myTasks');
}

function editTask(title, description, dueDate, priority, projectId, taskId) {
    let tasks = getTasks();
    let projects = getProjects();
    const currentTask = tasks[tasks.findIndex(task => task.taskId === taskId)];

    currentTask.title = title;
    currentTask.description = description;
    currentTask.dueDate = dueDate;
    currentTask.priority = priority;

    const currentProjectId = parseInt(currentTask.projectId);
  
    if (parseInt(projectId) !== currentProjectId) {
        const newProjectId = parseInt(projectId);
        const newProject = projects.find(project => project.projectId === newProjectId);
        if (!newProject) {
            console.log("New project assignment not found");
            return;
        }
        currentTask.projectId = parseInt(newProjectId);
    }
    else {
        currentTask.projectId = currentProjectId;
    }
    populateTaskStorage(tasks, 'myTasks');
}

export { editTask, addTask }

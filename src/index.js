import "./style.css";
import { addTask } from "./task.js";
import { renderProjectPage, hideSidebar } from "./dom.js";
import { addProjectHeader } from "./dom_project.js";
import { createTaskCard, removeTaskCard, updateFormProjectOptions } from "./dom_task.js";
import { getProjects, getTasks, storageAvailable, populateProjectStorage, populateTaskStorage } from './storage.js';
import { myTasks, myProjects, Task} from './data.js';

storageAvailable('localStorage') ? console.log('Local storage available') : console.log('Local storage not available');

if (!localStorage.getItem('myTasks')) {
    console.log("Initial populating Task Storage");
    populateTaskStorage(myTasks, 'myTasks');
}

if(!localStorage.getItem('myProjects')) {
    console.log("Initial populating Project Storage");
    populateProjectStorage(myProjects, 'myProjects');
}

// Initial load and rendering of projects
let projectIndex = 0;
let projects = getProjects();

projects.forEach((project) => {
    addProjectHeader(project);
});
renderProjectPage(projects[projectIndex]);
updateFormProjectOptions();

const taskForm = document.querySelector('#task-form');
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#due-date').value;
    const priority = document.querySelector('#priority').value;
    const projectValue = parseInt(document.querySelector('#project').value);
    const project = projects[projects.findIndex(project => project.projectId === projectValue)];
    const projectId = project.projectId;

    const newTask = new Task(title, description, dueDate, priority, projectId);

    addTask(newTask);

    if (projects[projectIndex] === project) {
        createTaskCard(newTask);
    }

    taskForm.reset();
});

// Handle completing tasks
document.addEventListener('click', function(e) {
    const button = e.target.closest('.completion-button');

    if (button) {
        let tasks = getTasks();
        const taskId = parseInt(button.getAttribute('data-id'), 10);
        const taskIndex = tasks.findIndex(task => task.taskId === taskId);
        tasks[taskIndex].completion = 'complete';
        populateTaskStorage(tasks, 'myTasks');
        removeTaskCard(taskId);
    }
});

// Handle project page navigation
document.addEventListener('click', (e) => {
    let projects = getProjects();
    const project = e.target.closest('.project-header-container');

    if (project) {
        const projectId = parseInt(project.getAttribute('data-id'), 10);
        const selectedProject = projects.findIndex(proj => proj.projectId === projectId);
        renderProjectPage(projects[selectedProject]);
        projectIndex = selectedProject;
    }
});

const sidebar = document.querySelector('#sidebar-toggle');
sidebar.addEventListener('click', () => {
    hideSidebar();
});

export { }
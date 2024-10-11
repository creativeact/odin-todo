import { linkTasksToProjects } from './project.js';
import { editTask } from './task.js';
import { renderProjectPage } from './dom.js';
import { renderEditIcon, renderHeartIcon } from './svg_icons.js';
import { getProjects, getTasks } from './storage.js';


const taskList = document.querySelector('.task-list');
const addTaskContainer = document.querySelector('#add-task-container');
const taskForm = document.querySelector('#task-form');
const addTaskToggle = document.querySelector('#add-task-toggle');
const cancelAddTask = document.querySelector('#cancel-add-task');
const projectSelect = document.querySelector('#project');

function createTaskCard(task) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.setAttribute('data-id', task.taskId);

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = `${task.title}`;
    taskTitle.classList.add('task-title');

    const taskDescription = document.createElement('p');
    taskDescription.textContent = `${task.description}`;
    taskDescription.classList.add('task-description');

    const taskDueDate = document.createElement('span');
    taskDueDate.textContent = `Due: ${task.dueDate}`;
    taskDueDate.classList.add('task-due-date');

    const taskPriority = document.createElement('span');
    const taskPriorityContainer = document.createElement('div');
    taskPriorityContainer.classList.add('task-priority-container');
    taskPriority.classList.add(`${task.priority}`);
    taskPriority.textContent = `${task.priority}`;
    taskPriority.classList.add('task-priority');
    taskPriorityContainer.appendChild(taskPriority);

    if (`${task.priority}` === 'Low') {
        const heartIcon = renderHeartIcon();
        taskPriorityContainer.appendChild(heartIcon)
    }
    else if (`${task.priority}` === 'Medium') {
        const heartIcon1 = renderHeartIcon();
        const heartIcon2 = renderHeartIcon();
        taskPriorityContainer.appendChild(heartIcon1);
        taskPriorityContainer.appendChild(heartIcon2);
    }
    else if (`${task.priority}` === 'High') {
        const heartIcon1 = renderHeartIcon();
        const heartIcon2 = renderHeartIcon();
        const heartIcon3 = renderHeartIcon();
        taskPriorityContainer.appendChild(heartIcon1);
        taskPriorityContainer.appendChild(heartIcon2);
        taskPriorityContainer.appendChild(heartIcon3);
    }

    const completionToggle = document.createElement('button');
    completionToggle.classList.add('completion-button');
    completionToggle.setAttribute('data-id', task.taskId);

    const editButton = document.createElement('button');
    const editButtonIcon = renderEditIcon('#EDEDED');
    editButton.classList.add('edit-task-button');
    editButton.appendChild(editButtonIcon);
    editButton.addEventListener('click', () => {
        if (!taskContainer.classList.contains('editing')) {
            taskContainer.classList.add('editing');
            displayEditTask(task.taskId);
        } 
    });

    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(taskPriorityContainer);
    taskContainer.appendChild(completionToggle);
    taskContainer.appendChild(editButton);

    taskList.appendChild(taskContainer);
}

function displayEditTask(taskId) {
    let tasks = getTasks();
    let projects = getProjects();
    
    const taskContainer = document.querySelector(`.task-container[data-id='${taskId}']`);

    const selectedTask = tasks[tasks.findIndex(task => task.taskId === taskId)];
    
    const currentProjectId = selectedTask.projectId;
    const projectIndex = projects.findIndex(project => project.projectId === currentProjectId);
    let currentProject = projects[projectIndex];

    const elementsToRemove = [
        taskContainer.querySelector('.task-title'),
        taskContainer.querySelector('.task-description'),
        taskContainer.querySelector('.task-due-date'),
        taskContainer.querySelector('.task-priority'),
        taskContainer.querySelector('.completion-button')
    ];

    elementsToRemove.forEach((element) => {
        if (element) {
            element.remove()
        }
    });

    const editForm = document.createElement('form');
    editForm.classList.add('edit-task-form');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.required = true;
    titleInput.classList.add('edit-title');
    titleInput.value = `${selectedTask.title}`;
   
    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    descriptionInput.classList.add('edit-description');
    descriptionInput.height = '80px'
    descriptionInput.style.resize = 'none';
    descriptionInput.setAttribute('maxlength', '200');
    descriptionInput.value = `${selectedTask.description}`;

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.name = 'date';
    dueDateInput.required = true;
    dueDateInput.classList.add('edit-date');
    dueDateInput.value = `${selectedTask.dueDate}`;

    const priorityInput = document.createElement('select');
    priorityInput.classList.add('edit-priority');
    priorityInput.name = 'priority';
    priorityInput.required = true;

    const priorities = ['Low', 'Medium', 'High'];

    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority;

        if (priority === selectedTask.priority) {
            option.selected = true;
        }

        priorityInput.appendChild(option);
    });

    const projectInput = document.createElement('select');
    projectInput.classList.add('edit-project');
    projectInput.name = 'project';
    projectInput.required = true;

    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.projectId;
        option.textContent = project.title;

        if (project.projectId === selectedTask.projectId) {
            option.selected = true;
        }

        projectInput.appendChild(option);
    })

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-edit-task');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        renderProjectPage(currentProject);
    });
    
    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.classList.add('save-edit-task');
    saveButton.textContent = 'Save';

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        editTask(titleInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value, projectInput.value, taskId);
        renderProjectPage(currentProject);
    });

    editForm.appendChild(titleInput);
    editForm.appendChild(descriptionInput);
    editForm.appendChild(dueDateInput);
    editForm.appendChild(priorityInput);
    editForm.appendChild(projectInput);
    editForm.appendChild(cancelButton);
    editForm.appendChild(saveButton);

    taskContainer.appendChild(editForm);
};

function removeTaskCard(taskId) {
    const taskCard = document.querySelector(`.completion-button[data-id='${taskId}']`).parentElement;
    taskList.removeChild(taskCard);
}

// Sidebar Add Task Form Functions
function updateFormProjectOptions() {
    const projects = getProjects();

    projectSelect.innerHTML = '';
    projects.forEach((project) => {
        const option = document.createElement('option');
        option.value = `${project.projectId}`;
        option.textContent = `${project.title}`;
        projectSelect.appendChild(option);
    })
}

const displayTaskForm = () => {
    taskForm.classList.add('show');
    addTaskToggle.style.transform = 'rotate(360deg)'
}

const hideTaskForm = () => {
    taskForm.classList.remove('show');
    addTaskToggle.style.transform = 'rotate(0deg)'
}

addTaskContainer.addEventListener('click', () => {
    if (!taskForm.classList.contains('show')) {
        displayTaskForm();
    }
    else {
        hideTaskForm();
    }
});

cancelAddTask.addEventListener('click', () => {
    hideTaskForm();
    taskForm.reset();
});

export { createTaskCard, removeTaskCard, updateFormProjectOptions };
import { addTask } from './task.js';
import { myProjects, myTasks, Task } from './data.js';
import { createTaskCard } from './dom_task.js';
import { renderSidebarToggle, renderAddIcon } from './svg_icons.js';
import { linkTasksToProjects }   from './project.js';
import { getProjects, getTasks } from './storage.js';

const taskList = document.querySelector('.task-list');
const projectTitle = document.querySelector('#current-project-title');

function renderProjectPage(project) {
    taskList.innerHTML = '';
    let projectIdRef;
    
    const projects = getProjects();
    const tasks = getTasks();

    // Error handling for invalid currentProject once it is deleted
    if (!project || project.projectId === undefined || project.projectId === null) {
        console.log('Invalid project object or projectId:');
        projectIdRef = null;
    } 
    else {
        const parsedId = parseInt(project.projectId);

        if (isNaN(parsedId) || projects.findIndex(project => parseInt(project.projectId) === parsedId) === -1) {
            console.log('Invalid projectId or project not found');
            projectIdRef = null;
        }
        else {
            projectIdRef = parsedId;
        }
    }

    projectIdRef === null ? projectIdRef = projects[0].projectId : '';
    console.log(`ProjectIdRef: ${projectIdRef}`);

    const linkedProjectArray = linkTasksToProjects(projects, tasks);
    const linkedProjectIndex = linkedProjectArray.findIndex(project => project.projectId === projectIdRef);
    console.log(`linkedProjectIndex: ${linkedProjectIndex}`);
    const linkedProject = linkedProjectArray[linkedProjectIndex];

    projects.forEach(project => {
        const pageHeader = document.querySelector(`.project-header-container[data-id='${project.projectId}']`)
        if (!pageHeader) {
            return;
        }
        else if (pageHeader.classList.contains('selected')) {
            pageHeader.classList.remove('selected');
        }
    });

    projectTitle.textContent = `${linkedProject.title}`;
    const currentPageHeader = document.querySelector(`.project-header-container[data-id='${linkedProject.projectId}']` );
    currentPageHeader.classList.add('selected');

    if (linkedProject.tasks === null || linkedProject.tasks.length === 0) {
        renderFirstTaskForm(linkedProject);
        renderFirstTaskButton(linkedProject);
    }

    const linkedTasks = linkedProject.tasks;
    linkedTasks.forEach((task) => {
        if (task.completion === 'incomplete')
        createTaskCard(task);
    });
}

let sidebarStatus = 'displayed';
const main = document.querySelector('#main');
const right = document.querySelector('#right');
const sidebar = document.querySelector('#left');
const righttop = document.querySelector('#right-top');
const profileGreeting = document.querySelector('#profile-greeting');

const hideSidebar = () => {
    main.style.gridTemplateColumns = '50px auto';
    main.style.gridTemplateRows = '0px auto';
    right.style.gridColumn = '1 / 3';
    righttop.style.justifyContent = 'space-between';

    setTimeout(() => {
        sidebar.style.visibility = 'hidden';
    }, 500);
    sidebar.classList.add('hidden');
    sidebarStatus = 'hidden';

    const button = document.createElement('button');
    const newSidebarToggle = renderSidebarToggle();
    button.id = 'hidden-view';
    button.style.gridColumn = '1 / 2';
    button.appendChild(newSidebarToggle);

    button.addEventListener('click', () => {
        displaySidebar();
    });

    righttop.insertBefore(button, profileGreeting);
};

const displaySidebar = () => {
    const button = document.querySelector('#hidden-view');
    if (button) {
        button.remove();
    }
    main.style.gridTemplateColumns = '1fr 4fr';
    main.style.gridTemplateRows = 'none';
    right.style.gridColumn = '2 / 3';
    righttop.style.justifyContent = 'end';
    sidebar.classList.remove('hidden');
    sidebar.style.visibility = 'visible';
    sidebarStatus = 'displayed';
};

function renderFirstTaskButton(currentProject) {
    const firstTaskContainer = document.createElement('div');
    firstTaskContainer.classList.add('first-task-container');
    firstTaskContainer.setAttribute('data-id', currentProject.projectId);

    const firstTaskIcon = renderAddIcon();

    const firsTaskText = document.createElement('h2');
    firsTaskText.classList.add('first-task-button-text');
    firsTaskText.textContent = 'Add A Task';

    firstTaskContainer.appendChild(firstTaskIcon);
    firstTaskContainer.appendChild(firsTaskText);
    firstTaskContainer.addEventListener('click', () => {
        firstTaskContainer.remove();
        const currentFirstTaskForm = document.querySelector(`.first-task-form[data-id='${currentProject.projectId}']`);
        currentFirstTaskForm.classList.remove('hidden');
    });

    taskList.appendChild(firstTaskContainer);
}

function renderFirstTaskForm(currentProject) {
    let projects = getProjects();

    const firstTaskForm = document.createElement('form');
    firstTaskForm.classList.add('first-task-form');
    firstTaskForm.classList.add('hidden');
    firstTaskForm.setAttribute('data-id', currentProject.projectId);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.classList.add('edit-title');
    titleInput.placeholder = 'Title';
   
    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    descriptionInput.classList.add('edit-description');
    descriptionInput.height = '80px'
    descriptionInput.style.resize = 'none';
    descriptionInput.setAttribute('maxlength', '200');
    descriptionInput.placeholder = 'Description (optional)';

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.name = 'date';
    dueDateInput.classList.add('edit-date');

    const priorityInput = document.createElement('select');
    priorityInput.classList.add('edit-priority');
    priorityInput.name = 'priority';

    const priorities = ['Low', 'Medium', 'High'];

    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority;
        priorityInput.appendChild(option);
    });

    const projectInput = document.createElement('select');
    projectInput.classList.add('edit-project');
    projectInput.name = 'project';

    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.projectId;
        option.textContent = project.title;

        if (project.projectId === currentProject.projectId) {
            option.selected = true;
        }

        projectInput.appendChild(option);
    });
    
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

    firstTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newTask = new Task(titleInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value, parseInt(projectInput.value));
        addTask(newTask);
        // Populate Task Storage
        renderProjectPage(currentProject);
    });

    firstTaskForm.appendChild(titleInput);
    firstTaskForm.appendChild(descriptionInput);
    firstTaskForm.appendChild(dueDateInput);
    firstTaskForm.appendChild(priorityInput);
    firstTaskForm.appendChild(projectInput);
    firstTaskForm.appendChild(cancelButton);
    firstTaskForm.appendChild(saveButton);

    taskList.appendChild(firstTaskForm);
};

export { renderProjectPage, displaySidebar, hideSidebar };
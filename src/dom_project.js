import { getProjects } from './storage.js';
import { deleteProject, renameProject, linkTasksToProjects } from './project.js';
import { renderDeleteIcon, renderEditIcon, renderProjectSettingsIcon } from './svg_icons.js';
import { updateFormProjectOptions } from './dom_task.js';
import { renderProjectPage } from './dom.js';

const projectList = document.querySelector('#project-list');
const addProjectContainer = document.querySelector('#add-project-container');
const addProjectToggle = document.querySelector('#add-project-toggle');
const projectForm = document.querySelector('#project-form');
const cancelAddProject = document.querySelector('#cancel-add-project');

function addProjectHeader(project) {
    const projectHeaderContainer = document.createElement('div');
    projectHeaderContainer.classList.add('project-header-container');
    projectHeaderContainer.setAttribute('data-id', project.projectId);

    const projectHeader = document.createElement('h2');
    projectHeader.textContent = `${project.title}`;
    projectHeader.classList.add('project-header');
    projectHeader.setAttribute('data-id', project.projectId);

    const projectSettingsIcon = renderProjectSettingsIcon();
    const projectSettings = renderProjectSettings();
    projectSettings.setAttribute('data-id', project.projectId);

    const projectSettingsButton = document.createElement('button');
    projectSettingsButton.appendChild(projectSettingsIcon);
    projectSettingsButton.classList.add('project-settings-button');

    projectSettingsDisplayHandler(projectSettings, projectSettingsButton);

    projectHeaderContainer.appendChild(projectHeader);
    projectHeaderContainer.appendChild(projectSettings);
    projectHeaderContainer.appendChild(projectSettingsButton);
    
    projectList.insertBefore(projectHeaderContainer, addProjectContainer);
}

function projectSettingsDisplayHandler(projectSettings, projectSettingsButton) {
    let projects = getProjects();
    
    const displayProjectSettings = () => {
        projectSettings.classList.add('show');
    }
    
    const hideProjectSettings = () => {
        projectSettings.classList.remove('show');
    }

    projectSettings.addEventListener('click', (e) => {
        const deleteButton = e.target.closest('.delete-project');
        const renameButton = e.target.closest('.rename-project');
        const projectId = parseInt(projectSettings.getAttribute('data-id'), 10);
        const renameInput = document.querySelector(`.new-name[data-id='${projectId}']`);
    
        if (deleteButton) {
            let projects = getProjects();
            const projectIndex = parseInt(projects.findIndex(project => project.projectId === projectId));
            if (projectIndex === 0 && projects[1] === undefined) {
                alert("You must have at least one project");
                return;
            }
            deleteProject(projectId);
            projectSettings.parentElement.remove(); 
            updateFormProjectOptions();
        }

        if (renameButton) {
            if (!renameInput) {
                projectSettings.classList.remove('show');
                const newInput = createNewProjectNameInput(projectId);

                const handleRename = () => {
                    const newName = newInput.value.trim();
                    if (newName) {
                        renameProject(projectId, newName);
                        let projects = getProjects();
                        const projectIndex = projects.findIndex(project => project.projectId === projectId);
                        renderProjectPage(projects[projectIndex]);
                    }    
                };
                newInput.onblur = handleRename;

                newInput.onkeydown = (event) => {
                    if (event.key === 'Enter') {
                        newInput.blur();
                    }
                };
            }
        }
    });

   projectSettingsButton.addEventListener('click', () => {
        projectSettings.classList.contains('show') ? hideProjectSettings() : displayProjectSettings();
    });
}

function createNewProjectNameInput(projectId) {
    let projects = getProjects();

    const projectHeaderContainer = document.querySelector(`.project-header-container[data-id='${projectId}']`);
    const projectHeader = document.querySelector(`.project-header[data-id='${projectId}']`);
    const projectIndex = projects.findIndex(project => project.projectId === projectId);
    const projectName = projects[projectIndex].title;

    const newProjectNameInput = document.createElement('input');
    newProjectNameInput.type = 'text';
    newProjectNameInput.pattern = '^(?!.*\\s{2}).*$';
    newProjectNameInput.maxLength = 20;
    newProjectNameInput.value = `${projectName}`;
    newProjectNameInput.setAttribute('class', 'new-name');
    newProjectNameInput.setAttribute('data-id', `${projectId}`);
    newProjectNameInput.focus();
    newProjectNameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            renameProject(projectId, newProjectNameInput.value.trim());
        }
    })

    projectHeaderContainer.appendChild(newProjectNameInput);
    projectHeader.replaceWith(newProjectNameInput);
    return newProjectNameInput;
}

const displayProjectForm = () => {
    projectForm.classList.add('show');
    addProjectToggle.style.transform = 'rotate(360deg)'
}

const hideProjectForm = () => {
    projectForm.classList.remove('show');
    addProjectToggle.style.transform = 'rotate(0deg)'
}

addProjectContainer.addEventListener('click', () => {
    projectForm.classList.contains('show') ? hideProjectForm() : displayProjectForm();
});

cancelAddProject.addEventListener('click', () => {
    projectForm.classList.contains('show') ? hideProjectForm() : displayProjectForm();
})

function renderProjectSettings() {
    const projectSettings = document.createElement('div');
    projectSettings.classList.add('project-settings');

    const renameProject = document.createElement('button');
    const editIcon = renderEditIcon('#4B648C');
    renameProject.setAttribute('alt', 'Rename Project');
    renameProject.classList.add('rename-project');
    renameProject.appendChild(editIcon);

    const deleteProject = document.createElement('button');
    const deleteIcon = renderDeleteIcon('#4B648C');
    deleteProject.setAttribute('alt', 'Delete Project');
    deleteProject.classList.add('delete-project');
    deleteProject.appendChild(deleteIcon);

    projectSettings.appendChild(renameProject);
    projectSettings.appendChild(deleteProject);

    return projectSettings;
}

function updateProjectHeader(projectId, newName) {
    const projects = getProjects();
    const projectIndex = projects.findIndex(project => project.projectId === projectId);
    const projectHeaderContainer = document.querySelector(`.project-header-container[data-id='${projectId}']`);
    const newNameInput = document.querySelector(`.new-name[data-id='${projectId}']`);

    const newProjectHeader = document.createElement('h2');
    newProjectHeader.textContent = `${newName}`;
    newProjectHeader.classList.add('project-header');
    newProjectHeader.setAttribute('data-id', `${projectId}`);
  
    projectHeaderContainer.appendChild(newProjectHeader);
    newNameInput.replaceWith(newProjectHeader);
    updateFormProjectOptions();
    /* projectIndex === projectIndex ? renderProjectPage(projects.projectId) : ''; */
}

export { addProjectHeader, updateProjectHeader }
import { addProjectHeader, updateProjectHeader } from "./dom_project.js";
import { updateFormProjectOptions } from "./dom_task.js";
import { myProjects, myTasks, Project } from "./data.js";
import { getProjects, populateProjectStorage } from './storage.js';


function addProject(project) {
    let projects = getProjects();

    projects.push(project);
    populateProjectStorage(projects, 'myProjects');
}

const projectForm = document.querySelector('#project-form');
projectForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.querySelector('#project-name').value;

    const newProject = new Project(title);

    addProject(newProject);
    addProjectHeader(newProject);
    updateFormProjectOptions();
    projectForm.reset();
})

function deleteProject(projectId) {
    let projects = getProjects();
    const projectIndex = projects.findIndex(project => project.projectId === projectId);
    projects.splice(projectIndex, 1);
    populateProjectStorage(projects, 'myProjects');
}

function renameProject(projectId, newName) {
    let projects = getProjects();

    const projectIndex = projects.findIndex(project => project.projectId === projectId);
    projects[projectIndex].title = `${newName}`;
    populateProjectStorage(projects, 'myProjects');

    updateProjectHeader(projectId, newName);
}

function linkTasksToProjects(projectArray, taskArray) {
    return projectArray.map(project => {
        const projectTasks = taskArray.filter(task => task.projectId === project.projectId);
        return { ...project, tasks: projectTasks };
    });
}

export { deleteProject, renameProject, linkTasksToProjects }
import { myProjects, myTasks, Task, Project } from './data.js';

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

function populateProjectStorage(object, id) {
    if (object && id) {
        const serializedData = JSON.stringify(object);
        localStorage.setItem(id, serializedData);
        console.log(`populateProjectStorage: Stored ${id} in local storage`);
    }
}

function populateTaskStorage(object, id) {
  if (object && id) {
    const serializedData = JSON.stringify(object);
    console.log(`Serialized Data: ${serializedData}`);
    localStorage.setItem(id, serializedData);
    console.log(`populateTaskStorage: Stored ${id} in local storage`);
  }
}

/* function reassignTaskToProject(taskId, newProjectId, tasksArray) {
  const task = tasksArray.find(t => t.taskId === taskId);
  if (task) {
      task.projectId = newProjectId; // Update the project ID for the task
      storeTasks(tasksArray); // Save the updated tasks back to local storage
  }
} */

function getTasks() {
    const storedTasks = localStorage.getItem('myTasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);

      return parsedTasks.map(taskData => {
        const task = Object.create(Task.prototype);
        Object.assign(task, taskData);
        return task;
      });
    }
    console.log("No tasks found in storage");
    return null;
}

function getProjects() {
    const storedProjects = localStorage.getItem('myProjects');
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);

      return parsedProjects.map(projectData => {
        const project = Object.create(Project.prototype);
        Object.assign(project, projectData);
        return project;
      });
    }
    console.log("No projects found in storage");
    return null
}

export { storageAvailable, populateTaskStorage, populateProjectStorage, getProjects, getTasks }
  
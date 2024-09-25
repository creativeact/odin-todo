import "./style.css";
import { Task } from "./task.js";

// Project Properties
    // title
    // percentage complete (as percentage of to dos)
    // linked to - dos

const taskForm = document.querySelector('#task-form');

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const dueDate = document.querySelector('#due-date').value;
    const priority = document.querySelector('#priority').value;
    const notes = document.querySelector('#notes').value;

    // Create new Task object with form values
    const newTask = new Task(title, dueDate, priority, notes);

    // Create the new task in the DOM
    console.log(newTask.getTaskInfo());

    // Reset form values and close modal
    taskForm.reset();
});

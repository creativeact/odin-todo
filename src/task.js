// Task actions
    // Create To Do
    // Edit To Do
    // Update To Completion Status

export class Task {

    static COMPLETION_STATUSES = ['complete', 'incomplete'];
    static PRIORITY_OPTIONS = ['low', 'medium', 'high'];

    constructor(title, dueDate, priority, notes, completion) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        completion = 'incomplete';
    }
    
    getTaskInfo() {
        return `${this.title}, due: ${this.dueDate}, priority: ${this.priority}, notes: ${this.notes}, completion status: ${this.completion}`
    }
}

class Project {
    static projectCounter = 0;

    constructor(title) {
        this.title = title;
        this.projectId = Project.projectCounter++;
    }
}

class Task {
    static taskCounter = 0;

    constructor(title, description, dueDate, priority, projectId) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.taskId = Task.taskCounter++;
        this.completion = 'incomplete';
        this.projectId = projectId;
    }
    
    getTaskInfo() {
        return `${this.title}, description: ${this.description}, due: ${this.dueDate}, priority: ${this.priority}, id: ${this.taskId} completion status: ${this.completion} projectId: ${this.projectId}`;
    }
}

const myProjects = [
    new Project("Breath of the Wild"),
    new Project("Ocarina of Time"),
    new Project("Twilight Princess")
];

const myTasks = [
    new Task("Find the Master Sword", "Locate the Master Sword in Korok Forest.", "2024-10-15", "High", 0),
    new Task("Defeat Calamity Ganon", "Prepare for the final battle against Calamity Ganon.", "2024-11-01","Medium", 0),
    new Task("Complete the Shrines", "Solve all shrine puzzles across Hyrule.", "2024-12-01", "Low", 0),
    new Task("Obtain the Ocarina of Time", "Collect the Ocarina of Time from Princess Zelda.", "2024-10-20", "High", 1),
    new Task("Complete the Forest Temple", "Navigate through and conquer the Forest Temple.", "2024-10-25", "Medium", 1),
    new Task("Collect all Gold Skulltulas", "Gather all Gold Skulltulas in Hyrule.", "2024-11-10", "Medium", 1),
    new Task("Transform into Wolf Link", "Use the Twilight Mirror to transform into Wolf Link.", "2024-10-30","Medium", 2),
    new Task("Explore Hyrule Field", "Discover the secrets hidden in Hyrule Field.", "2024-11-05", "Medium", 2),
    new Task("Defeat Zant", "Prepare for the battle against Zant.", "2024-11-15", "High", 2)
];

export { myProjects, myTasks, Task, Project }
import { action, observable } from 'mobx';

import { Task } from '../models/Task';
import { TaskService } from '../services/TaskService';

class TaskStore {
    @observable public tasks: Task[] = [];

    constructor() {
        this.loadTasks();
    }

    @action public loadTasks() {
        TaskService.getTasks()
            .then(tasks => this.tasks = [...tasks]);
    }

    @action public saveTask(task: Task) {
        TaskService.saveTask(task)
            .then(newTask => this.tasks = [...this.tasks, newTask]);
    }

    public getById(taskId: number): Task {
        return (this.tasks as any).find((task: Task) => task.id === taskId);
    }
}

export default new TaskStore();

import { action, observable, computed } from 'mobx';

import { Task, TaskWithChildren } from '../models/Task';
import { TaskService } from '../services/TaskService';

class TaskStore {
    @observable public tasks: Task[] = [];

    @computed get tree(): TaskWithChildren {
        const tasks = this.tasks
            .filter(task => task.parentId === 0)
            .map(this.transformTask);

        const taskWithChildren = new TaskWithChildren();
        taskWithChildren.children = tasks;

        return taskWithChildren;
    }

    constructor() {
        this.loadTasks();
        this.transformTask = this.transformTask.bind(this);
    }

    @action public loadTasks() {
        TaskService.getTasks()
            .then(tasks => this.tasks = [...tasks]);
    }

    @action public addTask(task: Task) {
        return TaskService.addTask(task)
            .then(newTask => {
                this.tasks = [...this.tasks, newTask];
                return newTask;
            });
    }

    @action public removeTask(task: Task) {
        TaskService.removeTask(task)
            .then(newTasks => this.tasks = newTasks.length > 0 ? newTasks : this.tasks);
    }

    @action public updateTask(task: Task) {
        TaskService.updateTask(task)
            .then(newTasks => this.tasks = newTasks.length > 0 ? newTasks : this.tasks);
    }

    public transformTask(task: Task): TaskWithChildren {
		return {...task, children: this.getChildren(task.id)};
    }

	public getChildren(taskId: number): TaskWithChildren[] {
		return this.tasks
			.filter(task => task.parentId === taskId)
			.map(this.transformTask);
    }

    public getById(taskId: number): Task {
        return (this.tasks as any).find((task: Task) => task.id === taskId);
    }
}

export default new TaskStore();

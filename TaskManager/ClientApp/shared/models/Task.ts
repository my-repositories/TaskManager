export class Task {
    id: number;
    createdAt: number;
    description: string;
    estimatedTime: number;
    leadTime: number;
    parentId: number;
    responsible: string;
    status: number;
    title: string;
}

export class TaskWithChildren extends Task {
    children: TaskWithChildren[];
}
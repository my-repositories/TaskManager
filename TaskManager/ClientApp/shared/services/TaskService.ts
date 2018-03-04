import { Task } from '../models/Task';
import { ApiService, ApiResponse } from './ApiService';

const controller = 'Task';

const getTasks = (): Promise<Task[]> => ApiService.get(controller)
    .then((response: ApiResponse<Task[]>) => {
        try {
            return response.data;
        } catch (error) {
            console.warn({error, response});
            return [];
        }
    });

const getTask = (id: number): Promise<Task> => ApiService.get(`${controller}/${id}`)
    .then((response: ApiResponse<Task>) => {
        try {
            return response.data;
        } catch (error) {
            console.warn({error, response});
            return {} as Task;
        }
    });

const saveTask = (body: Task): Promise<Task> => ApiService.put(controller, body)
    .then((response: ApiResponse<Task>) => {
        try {
            return response.data;
        } catch (error) {
            console.warn({error, response});
            return {} as Task;
        }
    });

export const TaskService = { getTasks, getTask, saveTask };

import { Task } from '../models/Task';
import { ApiService, ApiResponse } from './ApiService';

const controller = 'Task';

const addTask = (body: Task): Promise<Task> => ApiService.put(controller, body)
    .then((response: ApiResponse<Task>) => {
        try {
            return response.data;
        } catch (error) {
            console.warn({error, response});
            return body;
        }
    });

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

const removeTask = (body: Task): Promise<Task[]> => ApiService.del(controller, body)
    .then((response: ApiResponse<Task[]>) => {
        try {
            return response.data;
        } catch (error) {
            console.warn({error, response});
            return [] ;
        }
    });

const updateTask = (body: Task): Promise<Task[]> => ApiService.patch(controller, body)
    .then((response: ApiResponse<Task[]>) => {
        try {
            return response.data;
        } catch (error) {
            console.warn({error, response});
            return [] ;
        }
    });

export const TaskService = { addTask, getTasks, getTask, removeTask, updateTask };

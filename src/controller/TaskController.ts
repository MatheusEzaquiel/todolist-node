import { FastifyRequest } from "fastify";
import { Task } from "../model/Task";
import { TaskRepository } from "./../repository/TaskRepository";

const taskRepos = new TaskRepository();

export class TaskController {

    async index() {
        return await taskRepos.selectAll();
    }

    async save(id: number, title: string, description: string) {

        const taskToSave: Task = new Task(id, title, description, true, new Date(), new Date());
        
        const taskSaved = await taskRepos.insert(taskToSave);
        
        return taskSaved;
    }

    async get(id: number) {
        return await taskRepos.selectOne(id);
    }

    async remove(id: number) {
        return await taskRepos.removeOne(id);
    }

    async delete(id: number) {
        return await taskRepos.deleteOne(id);
    }

}
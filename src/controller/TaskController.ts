import { FastifyRequest } from "fastify";
import { Task } from "../model/Task";
import { TaskRepository } from "./../repository/TaskRepository";

const taskRepos = new TaskRepository();

export class TaskController {

    async index() {
        return await taskRepos.selectAll();
    }

    async listEnabled() {
        return await taskRepos.selectEnabled();
    }

    async listArchived() {
        return await taskRepos.selectArchived();
    }

    async listDone() {
        return await taskRepos.selectDoneTasks();
    }

    async listUndone() {
        return await taskRepos.selectUndoneTasks();
    }

    async get(id: number) {
        return await taskRepos.selectOne(id);
    }

    async save(id: number, title: string, description: string) {

        const taskToSave: Task = new Task(id, title, description, true, 1, new Date(), new Date());
        
        const taskSaved = await taskRepos.insert(taskToSave);
        
        return taskSaved;
    }

    async update(id: number, title: string, description: string, done: boolean, state: number) {
        
        const taskToUpdate: Task = new Task();
        
        taskToUpdate.id = id;
        taskToUpdate.title = title
        taskToUpdate.description = description;
        taskToUpdate.done = done;
        taskToUpdate.state = state

        return taskRepos.updateOne(taskToUpdate);

    }

    async archive(id: number) {
        return await taskRepos.archiveOne(id);
    }

    async remove(id: number) {
        return await taskRepos.deleteOne(id);
    }

}
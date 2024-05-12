import { Task } from "../model/Task";

const db = require("./../database");

export class TaskRepository {

    private db: any;

    constructor() {
        this.db = db;
    }

    async selectAll() {
        return await this.db.manyOrNone("SELECT * FROM tasks");
    }

    async selectEnabled() {
        return await this.db.manyOrNone("SELECT * FROM tasks WHERE state = 1");
    }

    async selectArchived() {
        return await this.db.manyOrNone("SELECT * FROM tasks WHERE state = 0");
    }

    async selectDoneTasks() {
        return await this.db.manyOrNone("SELECT * FROM tasks WHERE done = TRUE")
    }
    
    async selectUndoneTasks() {
        return await this.db.manyOrNone("SELECT * FROM tasks WHERE done = FALSE")
    }

    async insert(task: Task) {
        await this.db.any("INSERT INTO tasks (title, description) VALUES ($1, $2)", [task.title, task.description]);
        return this.selectLast();
    }

    async selectOne(id: number) {
        return await this.db.oneOrNone("SELECT * FROM tasks WHERE id = $1", id);
    }

    async updateOne(task: Task) {

        const validValues: string[] = [];

        if(task.title != null) validValues.push("title = $1");
        if(task.description != null) validValues.push("description = $2");
        if(task.done != null) validValues.push("done = $3");
        if(task.state != null) validValues.push("state = $4");
        validValues.push("updated_at = $5");

        this.db.any("UPDATE tasks SET " + validValues.join(", ") + " WHERE id = $6", [task.title, task.description, task.done, task.state, new Date(), task.id]);
        return this.selectOne(task.id || 0);

    }

    async archiveOne(id: number) {
        this.db.any("UPDATE tasks SET state = 0 WHERE id = $1", id);
        return this.selectOne(id);
    }

    async deleteOne(id: number) {
        this.db.any("DELETE FROM tasks WHERE id = $1", id);
        return this.selectOne(id);
    }

    async selectLast() {
        return await this.db.any("SELECT * FROM tasks ORDER BY created_at DESC LIMIT 1");
    }

}
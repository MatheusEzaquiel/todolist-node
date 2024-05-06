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

    async insert(task: Task) {
        await this.db.any("INSERT INTO tasks (title, description) VALUES ($1, $2)", [task.title, task.description]);
        return this.selectLast();
    }

    async selectOne(id: number) {
        return await this.db.oneOrNone("SELECT * FROM tasks WHERE id = $1", id);
    }

    async removeOne(id: number) {
        this.db.any("UPDATE tasks SET done = false WHERE id = $1", id);
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
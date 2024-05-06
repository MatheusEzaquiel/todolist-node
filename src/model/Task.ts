export class Task {

    id: number;
    title: string;
    done: boolean;
    description: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, title: string, description: string, done: boolean, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.done = done;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}
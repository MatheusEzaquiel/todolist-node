export class Task {

    id: number | null;
    title: string | null;
    done: boolean | null;
    description: string | null;
    state: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;

    constructor(id?: number | null, title?: string, description?: string, done?: boolean, state?: number, createdAt?: Date, updatedAt?: Date) {

        if(id !== undefined && title !== undefined && description !== undefined && done !== undefined && state !== undefined &&  createdAt !== undefined && updatedAt !== undefined) {
            this.id = null;
            this.title = title;
            this.description = description;
            this.done = done;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        } 
        
        this.id = id || null;
        this.title = title || null;
        this.description = description || null;
        this.done = done || null;
        this.state = state || null;
        this.createdAt = createdAt || null;
        this.updatedAt = updatedAt || null;
        
    }

}
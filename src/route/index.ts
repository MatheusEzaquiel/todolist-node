import fastify, { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { TaskController } from "../controller/TaskController";
import { Task } from "../model/Task";


export const routes = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    const taskController = new TaskController();

    fastify.get("/tasks", async (request: FastifyRequest, reply: FastifyReply) => {
        const rep: Task[] = await taskController.index();  
        reply.send(rep);
    });

    fastify.get("/tasks/enabled", async (request: FastifyRequest, reply: FastifyReply) => {
        const rep: Task[] = await taskController.listEnabled();  
        reply.send(rep);
    });

    fastify.get("/tasks/archived", async (request: FastifyRequest, reply: FastifyReply) => {
        const rep: Task[] = await taskController.listArchived();  
        reply.send(rep);
    });

    fastify.get("/tasks/done", async (request: FastifyRequest, reply: FastifyReply) => {
        const rep: Task[] = await taskController.listDone();  
        reply.send(rep);
    });

    fastify.get("/tasks/undone", async (request: FastifyRequest, reply: FastifyReply) => {
        const rep: Task[] = await taskController.listUndone();  
        reply.send(rep);
    });

    fastify.get(`/tasks/:id`, async (request: FastifyRequest, reply: FastifyReply) => {
        const params = request.params as { id: string };
        const id: number = parseInt(params.id);

        const rep: Task = await taskController.get(id);
        reply.send(rep);
    });

    fastify.post("/tasks", async (request: FastifyRequest, reply: FastifyReply) => {
        
        const { id, title, description}: any = request.body;
        const rep: Task = await taskController.save(id, title, description);

        reply.send(rep);
    });

    fastify.patch("/tasks/:id", async (request: FastifyRequest, reply: FastifyReply) => {

        const params = request.params as { id: string };
        const { title, description, done, state }: any = request.body;
        const id = parseInt(params.id);

        const rep: Task = await taskController.update(id, title, description, done, state);
        reply.send(rep);

    });

    fastify.delete(`/tasks/:id`, async (request: FastifyRequest, reply: FastifyReply) => {
        const params = request.params as { id: string };
        const id = parseInt(params.id);

        const rep: Task = await taskController.archive(id);
        reply.send(rep);
    });

    fastify.delete(`/tasks/:id/delete`, async (request: FastifyRequest, reply: FastifyReply) => {
        const params = request.params as { id: string };
        const id = parseInt(params.id);

        const rep: Task = await taskController.remove(id);
        reply.send(rep);
    });

}
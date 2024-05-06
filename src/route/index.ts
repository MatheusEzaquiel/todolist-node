import fastify, { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { TaskController } from "../controller/TaskController";
import { Task } from "../model/Task";

const taskController = new TaskController();

// rever 
interface CreateTaskDTO  {
    id: number,
    title: string,
    description: string
}


export const routes = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.get("/tasks", async (request: FastifyRequest, reply: FastifyReply) => {
        const rep: Task[] = await taskController.index();
        reply.send(rep);
    });

    fastify.post("/tasks", async (request: FastifyRequest, reply: FastifyReply) => {
        
        const { id, title, description}: any = request.body;
        const rep: Task = await taskController.save(id, title, description);

        reply.send(rep);
    });

    fastify.get(`/tasks/:id`, async (request: FastifyRequest, reply: FastifyReply) => {
        const params = request.params as { id: string };
        const id: number = parseInt(params.id);

        const rep: Task = await taskController.get(id);
        reply.send(rep);
    });

    fastify.delete(`/tasks/:id`, async (request: FastifyRequest, reply: FastifyReply) => {
        const params = request.params as { id: string };
        const id = parseInt(params.id);

        const rep: Task = await taskController.remove(id);
        reply.send(rep);
    });

    fastify.delete(`/tasks/:id/delete`, async (request: FastifyRequest, reply: FastifyReply) => {
        const params = request.params as { id: string };
        const id = parseInt(params.id);

        const rep: Task = await taskController.delete(id);
        reply.send(rep);
    });

}
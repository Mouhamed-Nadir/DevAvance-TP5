import bookRoutes from "../controllers/controller.js";

export default async function routes(fastify, options) {
    fastify.register(bookRoutes, { prefix: "/books" });
}
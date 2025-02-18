import Fastify from "fastify";
import fs from "fs";
import { connectDB } from "../database/config.js";
import routes from "../routes/routes.js";

const port = 3000;

// Connexion à MongoDB
connectDB();

const fastify = Fastify({
    http2: true,
    https: {
        key: fs.readFileSync("./server.key"),
        cert: fs.readFileSync("./server.crt"),
        allowHTTP1: true
    },
    logger: true
});

fastify.register(routes);

// Démarrer le serveur
fastify.listen({ port }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`✅ Fastify écoute sur : ${address}`);
});
const fastify = require("fastify")({ logger: true });

const registerDecorations = require("./app/controllers/utils/fastifyDecorations");
const registerAllControllers = require("./app/controllers/index");

registerDecorations(fastify);
registerAllControllers(fastify);

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start();

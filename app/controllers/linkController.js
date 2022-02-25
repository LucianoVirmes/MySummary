const S = require('fluent-json-schema')
const { Link } = require("../models/index.js");

const createLinkBody = S.object()
    .prop("title", S.string().required())
    .prop("url", S.string().required());

const createLinkResponseBody = S.object()
    .prop("id", S.number()).extend(createLinkBody);


const createUserSchema = {
    body: createLinkBody,
    response: {
        200: createLinkResponseBody,
    }
}

async function linkRoutes(fastify, options) {
    fastify.post("/link", { schema: createUserSchema }, async (request, reply) => {
        try {
            const { title, url } = request.body;
            const created = await Link.create({ title, url });
            return created;
        } catch (err) {
           return fastify.customErrorHandler(err, reply);
        }
    });
    
    fastify.get("/link", async (request, reply) => {
        try {
            const created = await Link.findAll();
            return created;
        } catch (err) {
            return fastify.customErrorHandler(err, reply);
        }
    });
}

module.exports = linkRoutes;

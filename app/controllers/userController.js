const S = require('fluent-json-schema')
const { User } = require("../models/index.js")

const createUserBody = S.object()
    .prop("name", S.string().required())
    .prop("login", S.string().required())
    .prop("password", S.string().minLength(5).maxLength(10).required())
    .prop("username", S.string().required())

const createUserResponseBody = S.object()
    .prop("id", S.number())
    .prop("name", S.string().required())
    .prop("login", S.string().required())
    .prop("username", S.string().required());

const createUserSchema = {
    body: createUserBody,
    response: {
        200: createUserResponseBody
    }
}

async function userRoutes(fastify, options) {
    fastify.post("/user", { schema: createUserSchema }, async (request, reply) => {
        try {
            const { name, login, password, username } = request.body;
            const created = await User.create({ name, login, password, username });
            return created;
        } catch (err) {
            return fastify.customErrorHandler(err, reply);
        }
    })
}

module.exports = userRoutes;

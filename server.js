const fastify = require("fastify")({logger: true});
const { Link, User } = require("./app/models/index.js");

fastify.route({
    method: "POST",
    url: "/link",
    schema: {
        body: {
            type: 'object',
            properties: {
                title: {type: 'string'},
                url: {type: 'string'},
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    id: {type: 'number'},
                    title: {type: 'string'},
                    url: {type: 'string'},
                }
            },
            500: {
                type: 'object',
                properties: {
                    error: {type: 'string'}
                }
            }
        }
    },
    preHandler: async (request, reply) => {
        console.log("autentication");
    },
    handler: async (request, reply) => {
        try {
            const { title, url } = request.body;
            const created = await Link.create({ title, url });
            return created;
        } catch(err) {
            fastify.log.error(err);
            reply.code(500);
            return {error: err.message};
        }
    }
})

fastify.route({
    method: "GET",
    url: "/link",
    preHandler: async (request, reply) => {
        console.log("autentication");
    },
    handler: async (request, reply) => {
        try {
            const created = await Link.findAll();
            return created;
        } catch(err) {
            fastify.log.error(err);
            return "erro ao listar link";
        }
    }
})

fastify.route({
    method: "POST",
    url: "/user",
    schema: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    allowNull: false,
                },
                login: {
                    type: 'string',
                    allowNull: false
                },
                password: {
                    type: 'string',
                    allowNull: false
                },
                username: {
                    type: 'string',
                    allowNull: false
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        id: {type: 'number'},
                        name: {type: 'string'},
                        login: {type: 'string'},
                        username: {type: 'string'},
                    }
                }
            }
        }
    },
    handler: async(request, reply) => {
        try {
            const { name, login, password, username } = request.body;
            const created = await User.create({name, login, password, username});
            return created;
        } catch (err) {
            fastify.log.error(err);
            reply.code(500);
            return {error: err.message};
        }
    }
});

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

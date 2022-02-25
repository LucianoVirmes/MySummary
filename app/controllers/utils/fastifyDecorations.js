function registerDecorations(fastify) {
    fastify.decorate('customErrorHandler', function (err, reply) {
        this.log.error(err);

        const statusCode = 500;
        const serverError = "Server error";
        reply.status(statusCode);

        if (err.errors) {
            return { statusCode, error: serverError, errors: err.errors.map(error => ({ message: error.message })) };
        }

        return { statusCode, error: serverError, message: err.message };
    });
}

module.exports = registerDecorations;

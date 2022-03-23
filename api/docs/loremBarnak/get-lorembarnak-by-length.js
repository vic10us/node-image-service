module.exports = {
    get: {
        tags: ["Extras"],
        description: "Get a lorem-barnak!",
        operationId: "getLoremBarnakByLength",
        parameters: [
            {
                name: "numWords",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/numWords"
                },
                required: true,
                description: "Number of words to request",
            }
        ],
        responses: {
            200: {
                description: "Lorem barnak obtained",
                content: {
                    "text/plain": {
                        schema: {
                            $ref: "#/components/schemas/LoremBarnakString"
                        },
                    },
                },
            },
        },
    },
};
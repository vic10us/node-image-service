module.exports = {
    get: {
        tags: ["Extras"],
        description: "Get a lorem-barnak!",
        operationId: "getLoremBarnak",
        parameters: [],
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

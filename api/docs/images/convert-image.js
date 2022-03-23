module.exports = {
    post: {
        tags: ["Images"],
        description: "Convert Image",
        operationId: "convertImage",
        consumes: ["multipart/form-data"],
        parameters: [
            {
                name: "file",
                type: "file",
                required: true,
                in: "formData",
            },
            {
                name: "dpi",
                type: "integer",
                required: false,
                in: "formData",
            },
            {
                name: "keep",
                type: "boolean",
                required: true,
                in: "formData",
            },
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
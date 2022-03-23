module.exports = {
    components: {
        schemas: {
            id: {
                type: "string", // data type
                description: "An id of a todo", // desc
                example: "tyVgf", // example of an id
            },
            LoremBarnakString: {
                type: "string", // data type
                description: "A lorem barnak string response", // desc
                example: "this is a lorem barnak string", // example of an id
            },
            numWords: {
                type: "integer",
                description: "The number of words to request",
                example: 1
            },
            imageConversionRequest: {
                type: "object",
                properties: {
                    file: {
                        type: "string",
                        description: "The image to be converted (SVG is the only supported type for now)",
                        format: "binary"
                    },
                    dpi: {
                        type: "integer",
                        description: "The DPI of the resultant image response (Default: 144)",
                        example: 144
                    },
                    keep: {
                        type: "boolean",
                        description: "Server keeps the file in the local cache? (Default: false)",
                        example: false
                    }
                }
            }
        }
    }
}
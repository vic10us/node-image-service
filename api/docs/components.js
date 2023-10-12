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
            rankCardRequest: {
                type: "object",
                properties: {
                    cardTitle: {
                        type: "string",
                        description: "The title of the card",
                        example: "Rank Card",
                        required: false,
                        default: "Rank Card"
                    },
                    userName: {
                        type: "string",
                        description: "The username of the user",
                        example: "username",
                        required: true
                    },
                    userDescriminator: {
                        type: "string",
                        description: "The user's descriminator",
                        example: "1234"
                    },
                    rank: {
                        type: "integer",
                        description: "The rank of the user",
                        example: 1,
                        required: true
                    },
                    avatarUrl: {
                        type: "string",
                        description: "The url of the user's avatar",
                        example: "https://cdn.discordapp.com/avatars/123456789012345678/123456789012345678.png",
                        required: true
                    },
                    textXp: {
                        type: "integer",
                        description: "The amount of text xp the user has",
                        example: 100,
                        required: true
                    },
                    voiceXp: {
                        type: "integer",
                        description: "The amount of voice xp the user has",
                        example: 100,
                        required: true
                    },
                    textLevel: {
                        type: "integer",
                        description: "The text level of the user",
                        example: 1
                    },
                    voiceLevel: {
                        type: "integer",
                        description: "The voice level of the user",
                        example: 1,
                        required: true
                    },
                    xpForNextTextLevel: {
                        type: "integer",
                        description: "The amount of xp needed to reach the next text level",
                        example: 100,
                        required: true
                    },
                    xpForNextVoiceLevel: {
                        type: "integer",
                        description: "The amount of xp needed to reach the next voice level",
                        example: 100,
                        required: true
                    }
                }
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
export const bookSchema = {
    type: "object",
    required: ["title", "author"],
    properties: {
        title: { type: "string", minLength: 1 },
        author: { type: "string", minLength: 1 },
        description: { type: "string" },
        format: {
            type: "string",
            enum: ["poche", "manga", "audio"],
            default: "poche"
        }
    },
    additionalProperties: false
};

export const bookResponseSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        author: { type: "string" },
        description: { type: "string" },
        format: { type: "string" }
    }
};

export const updateBookSchema = {
    type: "object",
    properties: {
        title: { type: "string", minLength: 1 },
        author: { type: "string", minLength: 1 },
        description: { type: "string" },
        format: { type: "string", enum: ["poche", "manga", "audio"] }
    },
    additionalProperties: false
};


export const booksArrayResponseSchema = {
    type: "array",
    items: bookResponseSchema
};
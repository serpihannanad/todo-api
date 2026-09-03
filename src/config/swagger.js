const swaggerJSDoc = require("swagger-jsdoc");
 
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List API",
      version: "1.0.0",
      description: "Dokumentasi API Todo List — dibangun bertahap dari seri artikel backend Node.js",
    },
    servers: [
      { url: "/", description: "Current Server (Auto Detect / Vercel)" },
      { url: "https://todo-api-nadya8.vercel.app", description: "Production server" },
    
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
      schemas: {
        Todo: {
          type: "object",
          properties: {
            _id: { type: "string", example: "665f1c2e8b1e2a1a2c3d4e5f" },
            title: { type: "string", example: "Belajar Swagger" },
            description: { type: "string", example: "Menulis dokumentasi endpoint todo" },
            completed: { type: "boolean", example: false },
            owner: { type: "string", example: "665f1a2b8b1e2a1a2c3d1111" },
            created_by: {
              type: "string",
              example: "665f1a2b8b1e2a1a2c3d1111",
            },
            updated_by: {
              type: "string",
              example: "665f1a2b8b1e2a1a2c3d1111",
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
            archived: {
              type: "boolean",
              example: false,
            },
          },
        },
    },
  },
},
  // Swagger akan mencari komentar dokumentasi di semua file route
  apis: ["./src/routes/*.js"],
};
 
const swaggerSpec = swaggerJSDoc(options);
 
module.exports = swaggerSpec;
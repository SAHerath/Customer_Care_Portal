import { OAS3Definition } from "swagger-jsdoc";

const getSwaggerOptions = () => {
  const port = process.env.PORT;
  return {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Payment Service API",
        version: "1.0.0",
        description: "API documentation for the Payment Service",
      },
      servers: [
        {
          url: `https://localhost:${port}/`,
          description: "Development Server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT", // Optional, for documentation purposes
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    apis: ["./src/routes/*.ts"], // Specify where Swagger should look for API documentation comments
  } as unknown as OAS3Definition;
};

export default getSwaggerOptions;

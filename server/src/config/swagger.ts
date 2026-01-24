import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "REST API Node.js / Express / Typescript",
      version: "1.0.0",
      description: "API Docs for Products",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions: SwaggerUiOptions = {
  customSiteTitle: "Express/TypeScript REST API documentation ",
  customCss: `
  .swagger-ui .topbar{
  background-color: #2b3b45;
  } 
  .topbar-wrapper .link {
    content: url(none);
    height: 10px;
    width: auto;
    }`,
};
export { swaggerUiOptions };
export default swaggerSpec;

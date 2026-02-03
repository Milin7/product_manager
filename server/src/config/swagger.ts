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
      {
        name: "Categories",
        description: "API operations related to categories",
      },
    ],
    info: {
      title: "Personal finance manager",
      version: "1.1.0",
      description: "API Docs for Personal Finance Manager",
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

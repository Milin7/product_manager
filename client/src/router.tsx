import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as productsLoader } from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct from "./views/EditProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "new/product",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "products/:id/edit", // ROA Pattern - Resource-oriented design
        element: <EditProduct />,
      },
    ],
  },
]);

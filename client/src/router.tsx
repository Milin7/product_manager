// import Layout from "./layouts/Layout";
// import Products, { loader as productsLoader } from "./views/Products";
// import NewProduct, { action as newProductAction } from "./views/NewProduct";
// import EditProduct, {
//   loader as editProductLoader,
//   action as editProductAction,
// } from "./views/EditProduct";
// import { action as deleteProductAction } from "./components/ProductDetails";
// import { action as updateProductAction } from "./views/Products";
// import NewCategory, { action as newCategoryAction } from "./views/NewCategory";
// import MainDashboard from "./views/MainDashboard";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Products />,
//         loader: productsLoader,
//         action: updateProductAction,
//       },

//       {
//         path: "new/product",
//         element: <NewProduct />,
//         action: newProductAction,
//       },
//       {
//         path: "products/:id/edit", // ROA Pattern - Resource-oriented design
//         element: <EditProduct />,
//         loader: editProductLoader,
//         action: editProductAction,
//       },
//       {
//         path: "products/:id/delete",
//         action: deleteProductAction,
//       },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <MainDashboard />,
//       },
//       {
//         path: "income/:userId",
//         element: <NewCategory />,
//         action: newCategoryAction,
//       },
//     ],
//   },
// ]);

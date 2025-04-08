import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import { Product } from "../types";
import ProductTable from "../components/ProductTable";

export async function loader() {
  const products = await getProducts();
  return products;
}

export default function Products() {
  const products = useLoaderData() as Product[];

  return (
    <>
      <div className="flex justify-between">
        <h2 className="ml-9  text-2xl  float-start text-center  w-fit   text-project-blue font-semibold ">
          Products
        </h2>
        <Link
          to="new/product"
          className=" rounded-full float-end bg-project-blue self-center text-sm font-semibold hover:opacity-90 text-white shadow-md py-2 px-5"
        >
          Add Product
        </Link>
      </div>
      {products.length === 0 ? (
        <h1 className="text-xl text-center m-10   text-project-blue">
          You don't have any products
        </h1>
      ) : (
        <div className="flex-col">
          <ProductTable products={products} />
        </div>
      )}
    </>
  );
}

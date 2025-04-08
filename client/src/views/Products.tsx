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
      <div className="grid grid-cols-3 items-center content-center text-center">
        <div></div>
        <h2 className="  text-2xl text-center text-project-blue font-semibold ">
          Products
        </h2>
        <Link
          to="new/product"
          className="col-span-1 rounded-full w-fit right justify-self-end  bg-project-blue text-sm font-semibold hover:opacity-90 text-white shadow-md py-2 px-5"
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

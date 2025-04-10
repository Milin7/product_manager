import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import {
  getProducts,
  updateProductAvailability,
} from "../services/ProductService";
import { Product } from "../types";
import ProductTable from "../components/ProductTable";

export async function loader() {
  const products = await getProducts();
  return products;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateProductAvailability(+data.id);
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

      <div className="flex-col">
        <ProductTable products={products} />
      </div>
    </>
  );
}

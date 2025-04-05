import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import { ProductDetails } from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
  const products = await getProducts();
  return products;
}

export default function Products() {
  const products = useLoaderData() as Product[];

  return (
    <>
      <Link
        to="new/product"
        className=" float-end rounded-full bg-project-blue text-sm font-semibold hover:opacity-90 text-white shadow-md p-2"
      >
        Add Product
      </Link>
      <h2 className="text-2xl text-center ">Products</h2>

      <div className=" ">
        <table className=" w-full mt-5 rounded-full ">
          <thead className=" bg-project-blue text-sm text-white   ">
            <tr className="">
              <th className="py-2 rounded-l-full  font-semibold">Producto</th>
              <th className="py-2 font-semibold">Precio</th>
              <th className="py-2 font-semibold">Disponibilidad</th>
              <th className="py-2 rounded-r-full font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

import { Product } from "../types";
import { ProductDetails } from "./ProductDetails";

export type ProductTableProps = {
  products: Product[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="flex-col">
      <div className=" ">
        <table className=" w-full mt-5 rounded-full ">
          <thead className=" bg-project-blue text-sm text-white   ">
            <tr className="">
              <th className="py-2 rounded-l-full  font-semibold">Product</th>
              <th className="py-2 font-semibold">Price</th>
              <th className="py-2 font-semibold">Availability</th>
              <th className="py-2 rounded-r-full font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

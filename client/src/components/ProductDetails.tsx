import { Product } from "../types";
import { formatCurrency } from "../utils";

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const isAvailable = product.availability;
  return (
    <>
      <tr className="border-b-2 border-project-grey  ">
        <td className="p-3 text-lg text-project-grey font-medium">
          {product.name}
        </td>
        <td className="p-3 text-lg text-project-grey font-medium">
          {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-project-grey font-medium">
          {isAvailable ? "Available" : "Not available"}
        </td>
        <td className="p-3 text-lg text-project-grey font-medium "></td>
      </tr>
    </>
  );
}

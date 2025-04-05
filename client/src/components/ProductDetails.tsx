import { useNavigate } from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const navigate = useNavigate();
  const isAvailable = product.availability;
  return (
    <>
      <tr className="border-b-2  text-center border-project-grey  ">
        <td className="p-3 text-lg text-project-grey font-medium">
          {product.name}
        </td>
        <td className="p-3 text-lg text-project-grey font-medium">
          {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-project-grey font-medium">
          {isAvailable ? "Available" : "Not available"}
        </td>
        <td className="p-3 text-lg text-project-grey font-medium ">
          <div className=" flex gap-2 items-center">
            <button
              onClick={() =>
                navigate(`products/${product.id}/edit`, {
                  state: {
                    product,
                  },
                })
              }
              className="rounded-full  text-xs font-medium hover:bg-project-clear-grey border-project-grey border-2  py-1 hover:cursor-pointer px-3"
            >
              <p>Edit</p>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

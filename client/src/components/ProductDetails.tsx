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
              onClick={() => navigate(`products/${product.id}/edit`)}
              className="rounded-full  text-xs font-medium hover:bg-project-clear-grey border-project-grey border-2  py-1 hover:cursor-pointer px-3"
            >
              <div className="flex gap-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036A2.5 2.5 0 0119.5 6.5V6.5C19.5 7.33 19.169 8.126 18.5 8.5L7.5 19.5l-4 1 1-4L15.5 5.5c.374-.669 1.17-1 2-1H17.5z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <p>Edit</p>
              </div>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

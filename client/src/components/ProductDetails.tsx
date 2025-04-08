import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();
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
          <fetcher.Form method="POST">
            <button
              type="submit"
              name="id"
              value={product.id}
              className={`${
                isAvailable
                  ? "rounded-full  bg-project-blue text-sm font-semibold hover:opacity-90 text-white shadow-md py-2 px-5"
                  : "rounded-full  bg-project-danger text-sm font-semibold hover:opacity-90 text-white shadow-md py-2 px-5"
              } hover:cursor-pointer`}
            >
              {isAvailable ? "Available" : "Not available"}
            </button>
          </fetcher.Form>
        </td>
        <td className="p-3 text-l  flex  gap-2  text-project-grey font-medium ">
          <div className=" w-full ">
            <button
              onClick={() => navigate(`products/${product.id}/edit`)}
              className="rounded-full w-full  text-xs font-medium hover:bg-project-clear-grey border-project-grey border-2  py-1 hover:cursor-pointer px-3"
            >
              <div className="flex justify-center gap-1">
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
          <Form
            className="w-full "
            method="POST"
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm("Are you sure you want to delete this product?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Delete"
              className=" rounded-full uppercase  text-xs font-medium hover:bg-project-danger border-project-grey bg-project-blue text-white border-2 hover:border-project-danger w-full py-1 hover:cursor-pointer px-3"
            />
          </Form>
        </td>
      </tr>
    </>
  );
}

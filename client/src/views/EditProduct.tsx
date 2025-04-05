import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

const availabilityOptions = [
  { name: "Available", value: true },
  { name: "Not available", value: false },
];

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      redirect("/");
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "You must fill every field";
  }
  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
    return redirect("/");
  }
}
export default function EditProduct() {
  const product = useLoaderData();
  const error = useActionData() as string;
  return (
    <>
      <div className=" flex justify-start">
        {" "}
        <Link
          to="/"
          className=" rounded-full bg-project-blue text-sm font-semibold hover:opacity-90 text-white shadow-md py-2 px-5"
        >
          Go back to products
        </Link>
      </div>

      <div className=" flex justify-center mt-7 ">
        <h2 className=" text-center  text-3xl text-project-blue font-medium ">
          Edit product
        </h2>
      </div>

      <Form className="mt-10" method="POST">
        <div className=" gap-20">
          <ProductForm product={product} />
          <div className="flex flex-col items-center mb-4">
            <label
              className="text-project-blue font-medium text-xl text-center  "
              htmlFor="availability"
            >
              Availability:
            </label>
            <select
              id="availability"
              className="text-center my-2 block w-96 py-2 px-7 bg-project-clear rounded-full"
              name="availability"
              defaultValue={product?.availability.toString()}
            >
              {availabilityOptions.map((option) => (
                <option
                  className=""
                  id="option"
                  key={option.name}
                  value={option.value.toString()}
                >
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}{" "}
        </div>
        <div className=" flex justify-center">
          <input
            type="submit"
            className=" rounded-full bg-project-blue text-sm font-semibold hover:opacity-90 text-white shadow-md py-2 hover:cursor-pointer px-5"
            value="Save changes"
          />{" "}
        </div>
      </Form>
    </>
  );
}

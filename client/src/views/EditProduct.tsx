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
import { addProduct, getProductById } from "../services/ProductService";
import { Product } from "../types";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      redirect("/");
    }
    return product;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "You must fill every field";
  }
  if (error.length) {
    return error;
  }

  await addProduct(data);

  return redirect("/");
}
export default function EditProduct() {
  const product = useLoaderData() as Product;
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
          <div className="flex flex-col items-center mb-4">
            <label
              className="text-project-blue font-medium text-xl text-center "
              htmlFor="name"
            >
              Product name
            </label>
            <input
              id="name"
              type="text"
              className="text-center my-2 block w-96 py-2 px-7 bg-project-clear rounded-full"
              placeholder="What's the name of your product?"
              name="name"
              defaultValue={product.name}
            />
          </div>
          <div className="flex flex-col items-center mb-4">
            <label
              className="text-project-blue font-medium text-xl"
              htmlFor="price"
            >
              Price:
            </label>
            <input
              id="price"
              type="number"
              className="text-center my-2 block w-96 py-2 px-7 bg-project-clear rounded-full"
              placeholder="What's your product's price?"
              name="price"
              defaultValue={product.price}
            />
          </div>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}{" "}
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

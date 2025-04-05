import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

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
export default function NewProduct() {
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
          You haven't added any products
        </h2>
      </div>

      <Form className="mt-10" method="POST">
        {error && <ErrorMessage>{error}</ErrorMessage>} <ProductForm />
        <div className=" flex justify-center">
          <input
            type="submit"
            className=" rounded-full bg-project-blue text-sm font-semibold hover:opacity-90 text-white shadow-md py-2 hover:cursor-pointer px-5"
            value="Registrar Producto"
          />{" "}
        </div>
      </Form>
    </>
  );
}

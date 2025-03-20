import { Link } from "react-router-dom";

export default function Products() {
  return (
    <>
      <div className=" flex justify-between">
        <h2 className=" text-2xl ">Products</h2>
        <Link
          to="new/product"
          className=" rounded-full bg-project-blue text-sm font-semibold hover:opacity-90 text-white shadow-md p-2"
        >
          Add Product
        </Link>
      </div>
    </>
  );
}

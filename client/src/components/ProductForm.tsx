import { Product } from "../types";

type ProductFormProps = {
  product?: Product;
};

export default function ProductForm({ product }: ProductFormProps) {
  return (
    <>
      {" "}
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
          defaultValue={product?.name}
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
          defaultValue={product?.price}
        />
      </div>
    </>
  );
}

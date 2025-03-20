import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <>
      <div className=" uppercase flex justify-center my-7 bg-project-blue text-white w-full rounded-sm py-1 font-bold tracking-widest">
        <h1>{children}</h1>
      </div>
    </>
  );
}

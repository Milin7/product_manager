import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className=" h-fit ">
        <div>
          <h1 className=" text-center  p-10 text-4xl flex tracking-wider text-project-blue font-semibold justify-center">
            Product manager
          </h1>
        </div>
      </header>
      <main className=" bg-white w-4xl flex flex-col justify-self-center p-6 mx-7 rounded-md  shadow-sm ">
        <Outlet />
      </main>
    </>
  );
}

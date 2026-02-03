import { Outlet } from "react-router-dom";
const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Products", href: "/" },
];
export default function Layout() {
  return (
    <div className="flex flex-col gap-4">
      <header>
        <nav>
          <ul className="p-4 shadow-md bg-white flex justify-center items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  className=" font-semibold hover:transition hover:text-blue-700 hover:rounded-2xl "
                  href={link.href}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="m-4">
        <Outlet />
      </main>
    </div>
  );
}

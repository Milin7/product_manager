import { createRootRoute, Outlet } from "@tanstack/react-router";
import Layout from "../layouts/Layout";

function AppWithLayout() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export const Route = createRootRoute({
  component: AppWithLayout,
});

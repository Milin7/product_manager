import { createFileRoute } from "@tanstack/react-router";
import MainDashboard from "../views/MainDashboard";

export const Route = createFileRoute("/")({
  component: MainDashboard,
});

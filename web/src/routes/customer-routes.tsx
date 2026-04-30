import { Route, Routes } from "react-router";
import { Tickets } from "../pages/Tickets";
import { NotFound } from "../pages/NotFound";
import { AppLayout } from "../components/AppLayout";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Tickets />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

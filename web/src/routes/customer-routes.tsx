import { Route, Routes } from "react-router";
import { Tickets } from "../pages/Tickets";
import { NotFound } from "../pages/NotFound";
import { AppLayout } from "../components/AppLayout";
import { TicketDetails } from "../pages/TicketsDetails";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Tickets />} />
        <Route path="/details/:id" element={<TicketDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

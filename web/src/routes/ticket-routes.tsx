import { Route, Routes } from "react-router";
import { Tickets } from "../pages/Tickets";

export function TicketRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Tickets />} />
    </Routes>
  );
}

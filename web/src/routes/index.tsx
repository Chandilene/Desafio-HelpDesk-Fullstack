import { BrowserRouter } from "react-router";

// import { AuthRoutes } from "./auth-routes";

import { TicketRoutes } from "./ticket-routes";

export function Routes() {
  return (
    <BrowserRouter>
      {/* <AuthRoutes /> */}

      <TicketRoutes />
    </BrowserRouter>
  );
}

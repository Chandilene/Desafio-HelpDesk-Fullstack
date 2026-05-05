export type Ticket = {
  id: string;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  description: string;
  createdAt: string;
  updatedAt: string;
  technician?: {
    name: string;
  };
  customer?: {
    name: string;
  };
  services: {
    service: {
      id: string;
      name: string;
      price: number;
    };
  }[];
};

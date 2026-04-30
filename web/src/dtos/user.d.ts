type UserAPIRole = "CUSTOMER" | "ADMIN" | "TECHNICIAN";

type UserAPIResponse = {
  token: string;
  user: {
    avatar?: string;
    email: string;
    id: string;
    name: string;
    role: string;
  };
};

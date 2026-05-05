import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

interface SidebarProps {
  onCloseMenu: () => void;
}

export function Sidebar({ onCloseMenu }: SidebarProps) {
  const { session } = useAuth();
  const role = session?.user.role;
  const [activeTab, setActiveTab] = useState("tickets");
  const navigate = useNavigate();

  const getActiveClass = (tabName: string) =>
    activeTab === tabName
      ? "bg-blue-dark text-white"
      : "bg-transparent text-gray-400 hover:bg-gray-800";

  return (
    <nav className="md:flex flex-col gap-4 mt-10 w-full flex-1">
      {role === "CUSTOMER" && (
        <>
          <button
            type="button"
            className={`w-full p-4 rounded-xl flex items-center gap-3 cursor-pointer ${getActiveClass("tickets")}`}
            onClick={() => {
              setActiveTab("tickets");
              navigate("/");
              onCloseMenu();
            }}
          >
            <span>Meus chamados</span>
          </button>
          <button
            type="button"
            className={`w-full p-4 rounded-xl flex items-center gap-3 cursor-pointer ${getActiveClass("newTickets")}`}
            onClick={() => {
              setActiveTab("newTickets");
              navigate("/new");
              onCloseMenu();
            }}
          >
            <span>+ Criar chamado</span>
          </button>
        </>
      )}

      {role === "TECHNICIAN" && (
        <>
          <button
            type="button"
            className={`w-full p-4 rounded-xl flex items-center gap-3 cursor-pointer ${getActiveClass("tickets")}`}
            onClick={() => {
              setActiveTab("tickets");
              navigate("/");
              onCloseMenu();
            }}
          >
            <span>Meus chamados</span>
          </button>
        </>
      )}

      {role === "ADMIN" && (
        <>
          <button
            type="button"
            className={`w-full p-4 rounded-xl flex items-center gap-3 cursor-pointer ${getActiveClass("tickets")}`}
            onClick={() => {
              setActiveTab("tickets");
              navigate("/");
              onCloseMenu();
            }}
          >
            <span>Chamados</span>
          </button>
          <button
            type="button"
            className={`w-full p-4 rounded-xl flex items-center gap-3 cursor-pointer ${getActiveClass("tech")}`}
            onClick={() => {
              setActiveTab("tech");
              navigate("/");
              onCloseMenu();
            }}
          >
            <span>Técnicos</span>
          </button>
          <button
            type="button"
            className={`w-full p-4 rounded-xl flex items-center gap-3 cursor-pointer ${getActiveClass("customer")}`}
            onClick={() => {
              setActiveTab("customer");
              navigate("/");
              onCloseMenu();
            }}
          >
            <span>Clientes</span>
          </button>
          <button
            type="button"
            className={`w-full p-4 rounded-xl flex items-center gap-3 cursor-pointer ${getActiveClass("services")}`}
            onClick={() => {
              setActiveTab("services");
              navigate("/");
              onCloseMenu();
            }}
          >
            <span>Serviços</span>
          </button>
        </>
      )}
    </nav>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import { ReactSVG } from "react-svg";
import { useAuth } from "../hooks/useAuth";

import addIcon from "../assets/icons/plus.svg";
import listIcon from "../assets/icons/clipboard-list.svg";
import usersIcon from "../assets/icons/users.svg";
import clientIcon from "../assets/icons/briefcase-business.svg";
import serviceIcon from "../assets/icons/wrench.svg";

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
            <ReactSVG src={listIcon} className="w-5 h-5 fill-current" />
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
            <ReactSVG src={addIcon} className="w-5 h-5 fill-current" />
            <span> Criar chamado</span>
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
            <ReactSVG src={listIcon} className="w-5 h-5 fill-current" />
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
            <ReactSVG src={listIcon} className="w-5 h-5 fill-current" />
            <span>Chamados</span>
          </button>
          <button
            type="button"
            className={`w-full p-4 rounded-xl flex items-center gap-3 cursor-pointer ${getActiveClass("tech")}`}
            onClick={() => {
              setActiveTab("tech");
              navigate("/users");
              onCloseMenu();
            }}
          >
            <ReactSVG src={usersIcon} className="w-5 h-5 fill-current" />
            <span>Técnicos</span>
          </button>
          <button
            type="button"
            className={`w-full p-4 rounded-xl flex items-center gap-3 cursor-pointer ${getActiveClass("customer")}`}
            onClick={() => {
              setActiveTab("customer");
              navigate("/customers");
              onCloseMenu();
            }}
          >
            <ReactSVG src={clientIcon} className="w-5 h-5 fill-current" />
            <span>Clientes</span>
          </button>
          <button
            type="button"
            className={`w-full p-4 rounded-xl flex items-center gap-3 cursor-pointer ${getActiveClass("services")}`}
            onClick={() => {
              setActiveTab("services");
              navigate("/services");
              onCloseMenu();
            }}
          >
            <ReactSVG src={serviceIcon} className="w-5 h-5 fill-current" />
            <span>Serviços</span>
          </button>
        </>
      )}
    </nav>
  );
}

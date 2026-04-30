import { useState } from "react"; // 1. Importe o useState
import { Outlet } from "react-router";
import logo from "../assets/Logo_IconLight.svg";
import menuIcon from "../assets/icons/menu.svg";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();

  const getInitialsName = (name: string) => {
    if (!name) return "??";

    const names = name.split(" ");
    const first = names[0]?.[0] || "";
    const last = names.length > 1 ? names[names.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col md:flex-row overflow-hidden">
      <header
        className={`
        w-full bg-gray-900 flex flex-col items-center px-6 transition-all duration-300
        md:h-full md:w-64 md:py-10 md:items-start
        ${isMenuOpen ? "h-screen" : "h-24"} 
      `}
      >
        <div className="w-full h-24 flex items-center justify-between md:h-auto md:flex-col md:items-start md:gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-100 p-2.5 rounded-lg md:hidden"
            >
              <img src={menuIcon} alt="Menu" className="w-6 h-6" />
            </button>

            <img src={logo} alt="Logo" className="w-10 h-10" />
            <div className="flex flex-col">
              <h1 className="text-white text-xl font-bold leading-none">
                HelpDesk
              </h1>
              <span className="text-blue-light text-[10px] uppercase font-medium mt-1">
                {auth.session?.user?.role}
              </span>
            </div>
          </div>

          {!isMenuOpen && (
            <div className="w-12 h-12 rounded-full bg-blue-dark flex items-center justify-center md:hidden">
              {auth.session?.user.avatar ? (
                <img
                  src={`${api.defaults.baseURL}/files/${auth.session.user.avatar}`}
                  alt={auth.session.user.name}
                  className="w-full h-full object-cover rounded-4xl"
                />
              ) : (
                <span className="text-white font-bold text-sm">
                  {getInitialsName(auth.session?.user.name || "")}
                </span>
              )}
            </div>
          )}
          <button
            className="text-white cursor-pointer"
            onClick={() => auth.remove()}
          >
            Sair
          </button>
        </div>

        <div
          className={`${isMenuOpen ? "flex" : "hidden"} md:flex w-full flex-1`}
        >
          <Sidebar />
        </div>

        <div className="hidden md:flex w-full items-center gap-10 mt-auto border-t border-gray-800 pt-6">
          <div className="w-12 h-12 rounded-full bg-blue-dark flex items-center justify-center">
            {auth.session?.user?.avatar ? (
              <img
                src={`${api.defaults.baseURL}/files/${auth.session.user.avatar}`}
                alt={auth.session.user.name}
                className="w-full h-full object-cover rounded-4xl"
              />
            ) : (
              <span className="text-white font-bold text-sm">
                {getInitialsName(auth.session?.user.name || "")}
              </span>
            )}
          </div>
          <div className="md:flex md:flex-col text-gray-600 text-sm">
            <h4>{auth.session?.user.name}</h4>
            <p className="text-xs text-gray-400">{auth.session?.user.email}</p>
          </div>
        </div>
      </header>

      <main
        className={`
        flex-1 bg-white rounded-t-3xl md:rounded-l-[40px] md:rounded-tr-none md:my-4 md:mr-4 flex flex-col overflow-y-auto
        ${isMenuOpen ? "hidden md:flex" : "flex"} 
      `}
      >
        <div className="px-8 pt-8 md:pt-12">
          <h1 className="text-blue-dark text-3xl font-bold">Meus Chamados</h1>
        </div>
        <div className="w-full px-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

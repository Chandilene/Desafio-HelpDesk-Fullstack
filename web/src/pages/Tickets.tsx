import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "../services/api";

import eyeIcon from "../assets/icons/eye.svg";
import openIcon from "../assets/icons/circle-help.svg";
import inProgressIcon from "../assets/icons/clock-2.svg";
import closedIcon from "../assets/icons/circle-check-big.svg";

interface Ticket {
  id: string;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  price: string;
  createdAt: string;
  technician?: {
    name: string;
  };
  customer?: {
    name: string;
  };
  services: {
    service: {
      name: string;
      price: number;
    };
  }[];
}

export function Tickets() {
  const { session } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(session);

  const STATUS_VARIANTS = {
    OPEN: {
      label: "Aberto",
      classes: "bg-feedback-bg-open text-feedback-open",
      icon: openIcon,
    },
    IN_PROGRESS: {
      label: "Em atendimento",
      classes: "bg-feedback-bg-progress text-feedback-progress",
      icon: inProgressIcon,
    },
    CLOSED: {
      label: "Encerrado",
      classes: "bg-feedback-bg-done text-feedback-done",
      icon: closedIcon,
    },
  };

  async function fetchTickets() {
    try {
      setLoading(true);

      const response = await api.get("/tickets");

      setTickets(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Erro :", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) return <p>Carregando chamados...</p>;

  return (
    <div className="w-full border border-gray-500 rounded-2xl overflow-hidden mt-6 p-4">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="">
            <th className=" md:w-28 text-gray-400 text-sm text-left border-b border-gray-500">
              Atualizado em
            </th>
            <th className="hidden md:text-gray-400 md:text-sm md:table-cell text-left border-b border-gray-500">
              Id
            </th>
            <th className="text-gray-400 text-sm text-left border-b border-gray-500 ">
              Título
            </th>
            <th className="hidden md:text-gray-400 md:text-sm md:table-cell text-left border-b border-gray-500 ">
              Serviço
            </th>
            <th className="hidden md:text-gray-400 md:text-sm md:table-cell text-left border-b border-gray-500">
              Valor total
            </th>
            <th className="hidden md:text-gray-400 md:text-sm md:table-cell text-left border-b border-gray-500">
              Técnico
            </th>
            <th className="text-gray-400 text-sm text-left border-b border-gray-500">
              Status
            </th>
            <th className="border-b border-gray-500"> </th>
          </tr>
        </thead>

        <tbody className="w-full ">
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className=" w-20 md:w-28 text-xs text-gray-200 border-b border-gray-500">
                13/04/25 20:56
              </td>
              <td className="hidden md:text-gray-200 md:text-xs md:table-cell font-semibold border-b border-gray-500">
                {ticket.id}
              </td>
              <td className=" text-sm text-gray-200 font-semibold w-36 md:table-cell md:w-52 border-b border-gray-500">
                {ticket.title}
              </td>
              <td className="hidden md:text-gray-200 md:text-sm md:table-cell border-b border-gray-500">
                {ticket.services[0]?.service.name}
              </td>
              <td className="hidden md:text-gray-200 md:text-sm md:table-cell border-b border-gray-500">
                {Number(ticket.services[0]?.service.price).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  },
                )}
              </td>
              <td className="hidden md:text-gray-200 md:text-sm md:table-cell border-b border-gray-500">
                {ticket.technician?.name}
              </td>
              <td className="table-cell border-b border-gray-500 text-center">
                {(() => {
                  const variant =
                    STATUS_VARIANTS[ticket.status] || STATUS_VARIANTS.OPEN;

                  return (
                    <div
                      className={`w-7 h-7 md:w-fit  md:h-7 flex items-center justify-center gap-1.5 rounded-full md:rounded-4xl md:p-2  whitespace-nowrap} ${variant.classes}  `}
                    >
                      <img src={variant.icon} alt="" className="w-4 h-4" />
                      <span className="hidden md:flex md:text-xs">
                        {variant.label}
                      </span>
                    </div>
                  );
                })()}
              </td>
              <td className="table-cell border-b border-gray-500">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer bg-gray-500"
                >
                  <img src={eyeIcon} alt="" className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}

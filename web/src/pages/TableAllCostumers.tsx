import { useEffect, useState } from "react";
import { api } from "../services/api";
import { getCustomers } from "../services/users";
import { getInitialsName } from "../utils/getInitialsName";

import editIcon from "../assets/icons/pen-line.svg";
import trashIcon from "../assets/icons/trash.svg";

export function TableAllCostumers() {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;

    const loadAllTechnicians = async () => {
      try {
        const response = await getCustomers();

        if (mounted) {
          setUsers(response);
        }
        console.log("clientes listados", response);
      } catch (error) {
        console.log("Erro :", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadAllTechnicians();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p>Carregando clientes...</p>;
  return (
    <div>
      <h1 className="text-blue-dark text-[20px] font-bold mt-7">Clientes</h1>

      <div className="w-full border border-gray-500 rounded-2xl overflow-hidden mt-6 p-4">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className=" md:w-35 text-gray-400 text-sm text-left border-b border-gray-500">
                Nome
              </th>
              <th className="md:w-35 text-gray-400 md:text-sm md:table-cell text-left border-b border-gray-500">
                E-mail
              </th>
            </tr>
          </thead>
          <tbody className="w-full ">
            {users.map((u) => (
              <tr key={u.id} className="group">
                <td className=" flex gap-1.5 items-center shrink-0 font-bold w-25 md:w-50 text-xs py-4 px-4 text-gray-200 border-b border-gray-500">
                  <div className="w-7 h-7 rounded-full bg-blue-dark flex items-center justify-center shrink-0 overflow-hidden">
                    {u.avatar ? (
                      <img
                        src={`${api.defaults.baseURL}/files/${u.avatar}`}
                        alt={u.name}
                        className="w-full h-full object-cover rounded-4xl"
                      />
                    ) : (
                      <span className="text-gray-400 font-bold text-sm  ">
                        {getInitialsName(u.name || "")}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-200 font-bold  block max-w-30 md:max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {u.name}
                  </p>
                </td>
                <td className=" md:text-gray-200 md:text-xs md:table-cell border-b border-gray-500">
                  <span className="text-gray-200 text-sm   block max-w-30 md:max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {u.email}
                  </span>
                </td>

                <td className="table-cell border-b border-gray-500 text-center align-middle">
                  <div className="flex justify-center items-center gap-2 h-full">
                    <button
                      //   onClick={() => u.id && handleEdit(u.id)}
                      type="button"
                      className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer bg-gray-500"
                    >
                      <img
                        src={trashIcon}
                        alt="botão para remover cliente"
                        className="w-4 h-4"
                      />
                    </button>
                    <button
                      //   onClick={() => u.id && handleRemove(u.id)}
                      type="button"
                      className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer bg-gray-500"
                    >
                      <img
                        src={editIcon}
                        alt="botão para editar cliente"
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

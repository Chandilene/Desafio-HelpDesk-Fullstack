import editIcon from "../assets/icons/pen-line.svg";
import plusWhiteIcon from "../assets/icons/plusWhite.svg";
// import blockIcon from "../assets/icons/ban.svg";
import blockRedIcon from "../assets/icons/TagStatusRed.svg";
// import checkGreenIcon from "../assets/icons/TagStatusGreen.svg";
import checkIcon from "../assets/icons/circle-check.svg";

// import { useEffect, useState } from "react";
import { Button } from "../components/Button";
// import { api } from "../services/api";

// import { useNavigate } from "react-router";

export function TableAllServices() {
  // const navigate = useNavigate();

  // const [loading, setLoading] = useState(true);

  // function handleEdit(id: string) {
  //   navigate(`/edit-technician/${id}`);
  // }
  // function handleCreateTech() {
  //   navigate("/services");
  // }

  // useEffect(() => {
  //   let mounted = true;

  //   const loadAllTechnicians = async () => {
  //     try {
  //       const response = await getTechnicians();

  //       if (mounted) {
  //         setTechnicians(response);
  //       }
  //       console.log("tecnicos listados", response);
  //     } catch (error) {
  //       console.log("Erro :", error);
  //     } finally {
  //       if (mounted) {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   loadAllTechnicians();
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  // if (loading) return <p>Carregando tecnicos...</p>;

  return (
    <div>
      <div className="flex justify-between">
        {" "}
        <h1 className="text-blue-dark text-3xl font-bold mt-7">Serviços</h1>
        <Button
          className="flex gap-2 justify-center px-4 mt-7"
          // onClick={() => handleCreateTech()}
        >
          <img src={plusWhiteIcon} alt="" />
          <span className="hidden md:block">NOVO</span>
        </Button>
      </div>

      <div className="w-full border border-gray-500 rounded-2xl overflow-hidden mt-6 p-2">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="">
              <th className=" md:w-30 text-gray-400 text-sm text-left border-b border-gray-500">
                Título
              </th>
              <th className="text-gray-400 md:text-sm md:table-cell text-left border-b border-gray-500">
                Valor
              </th>
              <th className=" text-gray-400 text-sm text-left border-b border-gray-500 ">
                Status
              </th>
              <th className="border-b border-gray-500"> </th>
            </tr>
          </thead>

          <tbody className="w-full ">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="border-b border-gray-500 px-2 py-5 text-sm shrink-0 overflow-hidden">
                <p className="text-gray-200   block max-w-16 md:max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  Instalação de Rede
                </p>
              </td>
              <td className="text-gray-900 whitespace-nowrap text-xs md:text-sm border-b border-gray-500 px-2 py-5">
                R$ 180,00
              </td>
              <td className="border-b border-gray-500 px-2 py-5">
                <span className="hidden md:inline-block bg-red-100 text-red-700 text-[10px] md:text-xs font-bold px-2 py-1 rounded-full uppercase">
                  Inativo
                </span>
                <img
                  src={blockRedIcon}
                  alt="Reativar"
                  className="w-7 h-7 min-w-7 min-h-7 shrink-0 md:hidden"
                />
              </td>

              <td className="border-b border-gray-500 px-2 py-5 text-right">
                <div className="flex justify-end items-center gap-1 md:gap-2">
                  <button className="flex items-center justify-center gap-2 p-2.5 hover:bg-gray-500 rounded-xl text-gray-300 font-bold text-sm transition-colors cursor-pointer min-w-9 min-h-9">
                    <img
                      src={checkIcon}
                      alt="Reativar serviço"
                      className="w-6 h-6 min-w-6 min-h-6 shrink-0 opacity-80"
                    />

                    <span className="hidden md:block">Reativar</span>
                  </button>

                  <button
                    title="Editar"
                    className="p-2 bg-gray-500 hover:bg-gray-600 rounded-xl transition-colors cursor-pointer flex items-center justify-center min-w-9 min-h-9"
                  >
                    <img
                      src={editIcon}
                      alt="Editar"
                      className="w-6 h-6 min-w-6 min-h-6 shrink-0 opacity-80"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

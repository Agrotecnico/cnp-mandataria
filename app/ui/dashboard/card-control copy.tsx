import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline'

import { fetchCardData } from '@/app/lib/data'
import { Frente, Fondo } from '@/app/ui/marcos'
import  IconRespuesta  from "@/app/ui/logosIconos/icon-respuesta";
import  IconConsulta  from "@/app/ui/logosIconos/icon-consulta";
import  IconTramites  from "@/app/ui/logosIconos/icon-tramites";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  consultas: IconRespuesta,
  tramites: IconTramites,
};

export default async function CarControl() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfConsultas,
    numberOfTramites,
    numberOfRespondidas,
    numberOfTerminados
  } = await fetchCardData();

  
  return (
    <>
      <div className="flex flex-col justify-between ">
        <div className="flex p-2 pl-0">
          <h3 className="ml-2 text-sm font-medium sm:text-[15px]">
            Total Consultas 
            <span className="ml-2 opacity-60">{numberOfConsultas}</span>
          </h3>
        </div>

        <Frente className={`truncate p-3 text-xs text-center sm:text-[13px] sm:p-5 `} >
          <div className="flex gap-2 items-center h-6">
            <p>Sin responder</p>
            <p className="flex items-center justify-center rounded-full px-1 min-w-6 h-4 text-white bg-[#80a2e5]">{numberOfConsultas - numberOfRespondidas } </p>
          </div>

          <div className="flex gap-2 items-center h-6">
            <p>Respondidas</p>
            <p className="flex items-center justify-center rounded-full px-1 min-w-6 h-4 text-white bg-[#39507fcc]">{ numberOfRespondidas}</p>
          </div>
        </Frente>
      </div>

      <div className="flex flex-col justify-between ">
        <div className="flex p-2  pl-0">
          <h3 className="ml-2 text-sm font-medium sm:text-[15px]">
            Total Trámites 
            <span className="ml-2 opacity-60">{numberOfTramites}</span>
          </h3>
        </div>
        <Frente
          className={`
            truncate p-3 text-xs text-center sm:text-[13px] sm:p-5 `}
        >
          <div className="flex gap-2 items-center h-6">
            <p>Sin terminar</p>
            <p className="flex items-center justify-center rounded-full px-1 min-w-6 h-4 text-white bg-[#80a2e5]">{numberOfTramites - numberOfTerminados }</p>
          </div>
          <div className="flex gap-2 items-center h-6">
            <p>Terminados</p>
            <p className="flex items-center justify-center rounded-full px-1 min-w-6 h-4 text-white bg-[#39507fcc]">{numberOfTerminados}</p>
          </div>
        </Frente>
      </div>
    </>
  );
}


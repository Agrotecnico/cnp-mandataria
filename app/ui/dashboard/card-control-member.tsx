
import { fetchCardDataMember } from '@/app/lib/data'
import { Frente, Fondo } from '@/app/ui/marcos'


export default async function CarControlMember({email}: {email: string | null | undefined}) {

  const {
    numberOfConsultas,
    numberOfTramites,
    numberOfRespondidas,
    numberOfTerminados,
    numberOfComments,
  } = await fetchCardDataMember(email!);

  
  return (
    <div className='flex flex-col gap-4'>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <Frente className="w-full p-3  ">
          <h3 className="text-sm pb-1.5 font-medium sm:text-[15px]">
            Total Consultas 
            <span className="ml-2 opacity-60">{numberOfConsultas}</span>
          </h3>

          <div className={`truncate pt-1.5 text-xs text-center sm:text-[13px] `} >
            <div className="flex gap-2 items-center h-6">
              <p>Respondidas</p>
              <p className="flex items-center justify-center rounded-full px-1 min-w-6 h-[18px] text-white bg-[#39507fcc]">{ numberOfRespondidas}</p>
            </div>

            <div className="flex gap-2 items-center h-6">
              <p>En proceso...</p>
              <p className="flex items-center justify-center rounded-full px-1 min-w-6 h-[18px] text-white bg-[#80a2e5]">{numberOfConsultas - numberOfRespondidas } </p>
            </div>
          </div>
        </Frente>

        <Frente className="w-full p-3 ">
          <h3 className="text-sm pb-1.5 font-medium sm:text-[15px]">
            Total Trámites 
            <span className="ml-2 opacity-60">{numberOfTramites}</span>
          </h3>

          <div className={`truncate pt-1.5 text-xs text-center sm:text-[13px] `}>
            <div className="flex gap-2 items-center h-6">
              <p>Terminados</p>
              <p className="flex items-center justify-center rounded-full px-1 min-w-6 h-[18px] text-white bg-[#39507fcc]">{numberOfTerminados}</p>
            </div>
            <div className="flex gap-2 items-center h-6">
              <p>En proceso...</p>
              <p className="flex items-center justify-center rounded-full px-1 min-w-6 h-[18px] text-white bg-[#80a2e5]">{numberOfTramites - numberOfTerminados }</p>
            </div>
          </div>
        </Frente>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 ">
      <Frente  className="p-3 col-span-2 min-[428px]:col-span-1" >
        <h3 className="text-sm font-medium sm:text-[15px]">
          Total Comentarios
          <span className="ml-2 opacity-60">{numberOfComments}</span>
        </h3>
      </Frente>
      </div>
    </div>
  );
}


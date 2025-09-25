import Image from 'next/image'

import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { UpdateConsulta } from '@/app/ui/consultas/buttons';
import Search from '@/app/ui/search';
import { fetchFilteredConsultas } from '@/app/lib/data';
import distanceToNow from '@/app/lib/dateRelative';
import DeleteConsulta from "@/app/ui/consultas/delete-consulta"
import IconConsulta from '../logosIconos/icon-consulta';
import IconRespuesta from '../logosIconos/icon-respuesta'
import { User } from "@/app/lib/definitions"


export default async function TableConsultaAdmin({
  // user,
  query,
  currentPage,
}: {
  // user: User | undefined;
  query: string;
  currentPage: number;
}) {

  const AllConsultas = await fetchFilteredConsultas(query, currentPage);

  console.log("AllConsultas: ", AllConsultas[0].image)
  

  return (
    <>
    <div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <Search placeholder="Buscar consultas..." />
      </div>

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md">
            {AllConsultas?.map((AllConsulta, index) => (
              <div
                key={AllConsulta.id}
                className="mb-2 w-full text-sm rounded-lg p-3 bg-[#ffffff94] [box-shadow:inset_0_1px_#ffffff,inset_0_-1px_#0000002e] sm:p-4"
              >
                <div className="flex items-center mb-4">
                  <div className=" relative" data-testid="image-container">
                    { AllConsulta.image ? (
                        <Image
                          // decoding="async" 
                          src= {AllConsulta.image}
                          width={20}
                          height={20}
                          className="w-11 max-w-2xl rounded-full " alt="avatar user">
                          
                        </Image>
                      ) : (
                        <div className="flex w-12 h-12 text-2xl items-center justify-center rounded-full bg-[#020b1d11] text-[#39507fdd] ">
                        {AllConsulta?.email_id?.substring(0, 1).toUpperCase()}
                      </div>
                      )} 
                  </div>
                  <div className="flex flex-col justify-center items-start ml-4 w-full min-[800px]:items-start min-[800px]:my-1 ">
                    <h2 className="text-md font-semibold m-0" data-testid="username-test">
                      {AllConsulta?.name}
                    </h2>
                    <div className="flex text-[13px]">
                      <span>{AllConsulta?.email_id}</span>
                      {!AllConsulta?.email_verified && 
                      <span className='ml-2 text-red-600'>no verificado</span>
                      }
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full  py-2 gap-2 border-y border-[#020b1d14]">
                  <div className={`flex items-center `}>
                    {/* <div className="mr-2 px-[5px] bg-[#dd00dd00] rounded-[4px]">&#10003;</div> */}
                    <IconConsulta color="#ffffff"  color2="#39507fdd" size="17"  className="mr-2"/>
                    <div className={``}>
                      Consulta realizada 

                      <span className={`text-[13px] px-1 py-0.5 ${!AllConsulta.respuesta && "hidden"} `} >
                        el<span className="ml-1.5 px-1 rounded-lg">{formatDateToLocal(AllConsulta.created_at)}</span>
                      </span>
                      <span className={`text-[13px] ml-1 px-1.5 py-0.5 rounded-lg bg-[#ffffff] ${AllConsulta.respuesta && "hidden"}`}>
                        {distanceToNow(new Date(AllConsulta.created_at))}
                      </span> 
                    </div>
                  </div>

                  <div className={`flex items-center `}>
                    {/* <div className={`mr-2 px-[5px] rounded-[4px]  ${!AllConsulta.respuesta && "text-[#ffffff] bg-[#e580d0]"}`}>&#10003;</div> */}

                    {AllConsulta.respuesta ? <IconRespuesta color="#ffffff" color2="#39507fdd" size="17"  className="mr-2"/> : <IconRespuesta color="#ffffff" color2="#548eff" size="18"  className="mr-2 scale-x-[-1]"/>}

                    { AllConsulta.respuesta  ? (
                      <div className={``}>
                        Respondida el
                        <span className={`text-[13px] px-1.5 py-0.5 mx-1 rounded-lg ${!AllConsulta.respuesta && "hidden"} `} >
                          {formatDateToLocal(AllConsulta.updated_at)}
                        </span>
                        <span className="text-[13px] px-1.5 py-0.5 rounded-lg bg-[#ffffff]">{distanceToNow(new Date(AllConsulta.updated_at))}</span>
                      </div>
                      ) : (
                        <div>Enviar respuesta</div>
                      ) }
                  </div>
                </div>
                <div className="flex gap-2 items-end justify-end pt-2">
                  <UpdateConsulta id={AllConsulta.id} />
                  <DeleteConsulta id={AllConsulta.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

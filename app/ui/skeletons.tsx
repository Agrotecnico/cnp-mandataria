import IconFlecha from '@/app/ui/logosIconos/icon-flecha'
import { Frente } from '@/app/ui/marcos';
import { Button } from '@/app/ui/button';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardMemberSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function CardsMemberSkeleton() {
  return (
    <>
      <CardMemberSkeleton />
      <CardMemberSkeleton />
    </>
  );
}


export function CardControlSkeleton() {
  return (
    <div className={`flex flex-col gap-4`}>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <div className={`${shimmer} relative overflow-hidden w-full p-3 rounded-md bg-slate-50 `}>
          <div className="flex pb-1.5 font-medium ">
            <div className="w-28 h-6 rounded-md ml bg-slate-200"></div>
            <div className="w-4 h-6 rounded-md ml-2 bg-slate-200"></div>
          </div>

          <div className={`pt-1.5 border-t border-[#39507f2a] `} >
            <div className="flex gap-2 items-center">
              <div className="w-20 h-4 rounded-md bg-slate-200"></div>
              <div className="w-6 h-5 rounded-full bg-slate-300 flex items-center justify-center px-1 min-w-6"></div>
            </div>

            <div className="flex gap-2 items-center h-6">
              <div className="w-20 h-4 rounded-md bg-slate-200"></div>
              <div className="w-6 h-5 rounded-full bg-slate-300 flex items-center justify-center px-1 min-w-6"></div>
            </div>
          </div>
        </div>

        <div className={`${shimmer} relative overflow-hidden w-full p-3 rounded-md bg-slate-50 `}>
          <div className="flex pb-1.5 font-medium ">
            <div className="w-28 h-6 rounded-md ml bg-slate-200"></div>
            <div className="w-4 h-6 rounded-md ml-2 bg-slate-200"></div>
          </div>

          <div className={`pt-1.5 border-t border-[#39507f2a] `} >
            <div className="flex gap-2 items-center">
              <div className="w-20 h-4 rounded-md bg-slate-200"></div>
              <div className="w-6 h-5 rounded-full bg-slate-300 flex items-center justify-center px-1 min-w-6"></div>
            </div>

            <div className="flex gap-2 items-center h-6">
              <div className="w-20 h-4 rounded-md bg-slate-200"></div>
              <div className="w-6 h-5 rounded-full bg-slate-300 flex items-center justify-center px-1 min-w-6"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-2 gap-3 lg:grid-cols-3`}>
        <div  className={`${shimmer} relative overflow-hidden  bg-slate-50 rounded-md p-3 col-span-2 min-[428px]:col-span-1`} >
          <div className="flex font-medium ">
            <div className="w-32 h-6 rounded-md ml bg-slate-200"></div>
            <div className="w-4 h-6 rounded-md ml-2 bg-slate-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Cliente
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Monto
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Estado
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function FormConsultaSkeleton() {
  return (
    <>
      <div className={`${shimmer} opacity-50 rounded p-4 mt-24 w-full h-40 bg-gray-300  `}>
        <div className= "w-28 h-6 bg-gray-200" ></div>
      </div>

      <div className="opacity-50 mb-4 mt-4 flex flex-col  place-items-start gap-3 rounded border-[1px] border-[#fff0] bg-gray-300 p-3 ">
        <div className=" w-24 h-6 bg-gray-200 ">
        </div>
        <div className="flex w-full flex-col gap-4 sm:flex-row ">
          <div>
            <div className="flex flex-col rounded items-start gap-4 bg-gray-200  min-[500px]:flex-row min-[500px]:items-center  ">
              <div className="relative">
                <div
                  className="absolute m-0 h-8 w-[164px] rounded px-4 py-1 opacity-0"
                />
                <div className=" w-32 h-6 bg-white ">
                </div>
              </div>
            </div>
            <button
              className={`mt-1 hidden h-8 w-max rounded p-1 text-[13.5px] leading-4 duration-200   disabled:opacity-60 `}
            >
              <div className="flex">
                <p>Adjuntar archivo</p>
              </div>
            </button>
          </div>
          <div
            className={`relative opacity-50 flex h-[310px] w-full justify-center mb-4 rounded bg-gray-100  `}
          >
            <div className="w-9 h-12 my-auto relative flex bg-gray-300">
            </div>
          </div>
        </div>
      </div>

      <div className="w-20 h-10 ml-auto items-end flex justify-end gap-4 rounded-lg bg-gray-100">
        <div className="m-auto w-14 h-5 bg-gray-200 ">
        </div>
      </div>
    </>
  );
}



export function ResumenSkeleton() {
  return (
    <>
      <h1 className={` mb-[22px] mt-1.5 text-xl lg:text-2xl`}>
        Resumen
      </h1>

      <div className='flex flex-col gap-4 mb-4'>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <Frente className={`${shimmer} relative overflow-hidden !bg-[#ffffff44] w-full p-3 `}>
            <h3 className="text-sm pb-1.5 font-medium sm:text-[15px] opacity-50">
              Total Consultas 
              <span className="ml-2 ">0</span>
            </h3>

            <div className={`truncate pt-1.5 text-xs text-center sm:text-[13px] opacity-50 `} >
              <div className="flex gap-2 items-center h-6">
                <p>Respondidas</p>
                <p className="flex items-center justify-center rounded-full px-1 min-w-6 h-[18px] text-white bg-[#39507fcc]">0</p>
              </div>

              <div className="flex gap-2 items-center h-6">
                <p>En proceso...</p>
                <p className="flex items-center justify-center rounded-full px-1 min-w-6 h-[18px] text-white bg-[#80a2e5]">0 </p>
              </div>
            </div>
          </Frente>

          <Frente className={`${shimmer} relative overflow-hidden !bg-[#ffffff44] w-full p-3 `}>
            <h3 className="text-sm pb-1.5 font-medium sm:text-[15px]  opacity-50">
              Total Trámites 
              <span className="ml-2 ">0</span>
            </h3>

            <div className={`truncate pt-1.5 text-xs text-center sm:text-[13px] opacity-50`}>
              <div className="flex gap-2 items-center h-6">
                <p>Terminados</p>
                <p className="flex items-center justify-center rounded-full px-1 min-w-6 h-[18px] text-white bg-[#39507fcc]">0</p>
              </div>
              <div className="flex gap-2 items-center h-6">
                <p>En proceso...</p>
                <p className="flex items-center justify-center rounded-full px-1 min-w-6 h-[18px] text-white bg-[#80a2e5]">0</p>
              </div>
            </div>
          </Frente>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 ">
          <Frente  className={`${shimmer} relative overflow-hidden !bg-[#ffffff44] p-3 col-span-2 min-[428px]:col-span-1`} >
            <h3 className="text-sm font-medium sm:text-[15px] opacity-50">
              Total Comentarios
              <span className="ml-2">0</span>
            </h3>
          </Frente>
        </div>
      </div>
    </>
  );
}
export function ConsultasSkeleton() {
  return (
    <main className=''>
      <h1 className={` mb-[22px] mt-1.5 text-xl lg:text-2xl`}>
        Mis Consultas
      </h1>

      <Frente  className="mb-3 p-2.5 text-[13px] sm:p-4 sm:text-sm !bg-[#ffffff44]" >
        <div className="flex flex-col items-start " >
          <div className="w-full items-end flex gap-2 justify-between sm:gap-4">
            <div className="flex items-center flex-wrap text-[#39507f] opacity-60">
              <p className="font-medium text-sm mr-2 sm:text-[15px]">
                <span className="text-[13px] sm:text-[14px]">CONSULTA</span>
                <span className="bg-[#548effdd] ml-1 px-1 text-xs text-[#ffffff] rounded-md sm:text-[13px]">000</span>
              </p>
              <p className="flex flex-nowrap items-center">
                <span className="">realizada el </span>
  
                <time className={`${shimmer} before:via-[#39507f21] relative overflow-hidden w-20 h-[17px] text-[#39507f99] leading-[1.2] ml-1 rounded-lg px-1.5 bg-[#ffffff] sm:w-[88px] sm:h-[19px]`}></time>
              </p>
            </div>
  
            <Button
              className="mb-auto relative text-[#020b1daa] h-[30px] rounded-md border border-[#548eff33] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] opacity-60"
            >
              <div><span className="text-[12px] uppercase">Ver</span></div>
            </Button>
          </div>

          <div className="mt-3 w-full">
            <div className={`w-full h-5 `}>
              <div className={`${shimmer} relative overflow-hidden w-full h-[14px] bg-[#cbd5e1] opacity-80 rounded-md mb-1`}></div>
            </div>
            <div className={`w-3/4 h-5`}>
              <div className={`${shimmer} relative overflow-hidden w-full h-[14px] bg-[#cbd5e1] opacity-80 rounded-md mb-1`}></div>
            </div>
          </div>
        </div>
      </Frente>

      <Frente  className="mb-3 p-2.5 text-[13px] sm:p-4 sm:text-sm !bg-[#ffffff44]" >
        <div className="flex flex-col items-start " >
          <div className="w-full items-end flex gap-2 justify-between sm:gap-4">
            <div className="flex items-center flex-wrap text-[#39507f] opacity-60">
              <p className="font-medium text-sm mr-2 sm:text-[15px]">
                <span className="text-[13px] sm:text-[14px]">CONSULTA</span>
                <span className="bg-[#548effdd] ml-1 px-1 text-xs text-[#ffffff] rounded-md sm:text-[13px]">000</span>
              </p>
              <p className="flex flex-nowrap items-center">
                <span className="">realizada el </span>
  
                <time className={`${shimmer} before:via-[#39507f21] relative overflow-hidden w-20 h-[17px] text-[#39507f99] leading-[1.2] ml-1 rounded-lg px-1.5 bg-[#ffffff] sm:w-[88px] sm:h-[19px]`}></time>
              </p>
            </div>
  
            <Button
              className="mb-auto relative text-[#020b1daa] h-[30px] rounded-md border border-[#548eff33] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] opacity-60"
            >
              <div><span className="text-[12px] uppercase">Ver</span></div>
            </Button>
          </div>

          <div className="mt-3 w-full">
            <div className={`w-full h-5 `}>
              <div className={`${shimmer} relative overflow-hidden w-full h-[14px] bg-[#cbd5e1] opacity-80 rounded-md mb-1`}></div>
            </div>
            <div className={`w-3/4 h-5`}>
              <div className={`${shimmer} relative overflow-hidden w-full h-[14px] bg-[#cbd5e1] opacity-80 rounded-md mb-1`}></div>
            </div>
          </div>
        </div>
      </Frente>

      <Frente  className="mb-3 p-2.5 text-[13px] sm:p-4 sm:text-sm !bg-[#ffffff44]" >
        <div className="flex flex-col items-start " >
          <div className="w-full items-end flex gap-2 justify-between sm:gap-4">
            <div className="flex items-center flex-wrap text-[#39507f] opacity-60">
              <p className="font-medium text-sm mr-2 sm:text-[15px]">
                <span className="text-[13px] sm:text-[14px]">CONSULTA</span>
                <span className="bg-[#548effdd] ml-1 px-1 text-xs text-[#ffffff] rounded-md sm:text-[13px]">000</span>
              </p>
              <p className="flex flex-nowrap items-center">
                <span className="">realizada el </span>
  
                <time className={`${shimmer} before:via-[#39507f21] relative overflow-hidden w-20 h-[17px] text-[#39507f99] leading-[1.2] ml-1 rounded-lg px-1.5 bg-[#ffffff] sm:w-[88px] sm:h-[19px]`}></time>
              </p>
            </div>
  
            <Button
              className="mb-auto relative text-[#020b1daa] h-[30px] rounded-md border border-[#548eff33] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] opacity-60"
            >
              <div><span className="text-[12px] uppercase">Ver</span></div>
            </Button>
          </div>

          <div className="mt-3 w-full">
            <div className={`w-full h-5 `}>
              <div className={`${shimmer} relative overflow-hidden w-full h-[14px] bg-[#cbd5e1] opacity-80 rounded-md mb-1`}></div>
            </div>
            <div className={`w-3/4 h-5`}>
              <div className={`${shimmer} relative overflow-hidden w-full h-[14px] bg-[#cbd5e1] opacity-80 rounded-md mb-1`}></div>
            </div>
          </div>
        </div>
      </Frente>

      <div className="z-10 my-5 flex w-full justify-center">
        <div className="inline-flex items-center gap-3">
          <IconFlecha className={`w-[14px] scale-[-1] fill-[#39507f30] `} />

            <div className={`${shimmer} relative overflow-hidden flex rounded-[4px] gap-[1px] `}>
              <div className="w-8 h-8 bg-[#cbd5e1] rounded-l-md"></div>
              <div className="w-8 h-8 bg-[#cbd5e188] rounded-r-md"></div>
            </div>

          <IconFlecha className={`w-[14px] fill-[#39507f30] `} />
        </div>
      </div>
    </main>
  );
}
export function TramitesSkeleton() {
  return (
    <>
      <h1 className={` mb-[22px] mt-1.5 text-xl lg:text-2xl`}>
        Mis Trámites
      </h1>

      <Frente  className="py-4 px-3 mb-3 text-sm sm:px-4 !bg-[#ffffff44]" >
        <div className="w-full items-center flex gap-3 justify-between sm:items-center sm:mb-0">
          <div className="flex items-center gap-3 w-full opacity-60">
            <div className="flex items-center flex-nowrap gap-2 leading-tight">
              <img 
              src= "/dnrpa.png" 
              alt="icono trámites" 
              width={26} 
              height={"auto"}
              className="opacity-50 w-3 sm:w-4 md:mt-0" 
            />
              <div className={`${shimmer} relative overflow-hidden w-36 h-4 rounded-md bg-[#cbd5e1cc] sm:w-40 sm:h-[18px] `}></div>
            </div>
          </div>

          <Button
            className="relative mb-auto h-[30px] rounded-md border border-[#548eff33] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] !font-normal text-[#020b1daa] hover:bg-[#ffffff] hover:text-[#020b1ddd] hover:border-[#548eff66] active:!bg-[#eee] opacity-60"
          >
            <div className="text-[12px] uppercase">Ver</div>
          </Button>
        </div>

        <div className='flex items-center mt-4 gap-2'>
          <div className={`mb-auto text-[#39507f] text-[13px] opacity-70`}>
            ESTADO
          </div>

          <div className={`flex flex-row flex-wrap gap-1.5 items-center `}>
            <div className={`flex gap-[1px] my-[2px] w-28 h-4 bg-[#ffffff] text-white rounded-lg opacity-60`}>
              <div className="flex items-center justify-center text-[10px] text-center w-7 bg-[#39507fdd] rounded-l-lg ">
                1
              </div>

              <div className={`flex items-center justify-center text-[10px] text-center w-7 bg-[#39507fdd] `}>
                2
              </div>

              <div className={`flex items-center justify-center text-[10px] text-center w-7 bg-[#548effdd] `}>
                3
              </div>

              <div className={`flex items-center justify-center text-[10px] text-center w-7 text-[#020b1ddd] rounded-r-lg `}>
                4
              </div>
            </div>

            <div className={`flex items-center  `}>
              <div className={`${shimmer} relative overflow-hidden w-36 h-[14px] bg-[#cbd5e1cc] rounded-md flex flex-nowrap items-center `}></div>
              <IconFlecha className="ml-1 w-[12px] opacity-30" />
            </div>
          </div>
        </div>
      </Frente>

      <Frente  className="py-4 px-3 mb-3 text-sm sm:px-4 !bg-[#ffffff44]" >
        <div className="w-full items-center flex gap-3 justify-between sm:items-center sm:mb-0">
          <div className="flex items-center gap-3 w-full opacity-60">
            <div className="flex items-center flex-nowrap gap-2 leading-tight">
              <img 
              src= "/dnrpa.png" 
              alt="icono trámites" 
              width={26} 
              height={"auto"}
              className="opacity-50 w-3 sm:w-4 md:mt-0" 
            />
              <div className={`${shimmer} relative overflow-hidden w-36 h-4 rounded-md bg-[#cbd5e1cc] sm:w-40 sm:h-[18px] `}></div>
            </div>
          </div>

          <Button
            className="relative mb-auto h-[30px] rounded-md border border-[#548eff33] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] !font-normal text-[#020b1daa] hover:bg-[#ffffff] hover:text-[#020b1ddd] hover:border-[#548eff66] active:!bg-[#eee] opacity-60"
          >
            <div className="text-[12px] uppercase">Ver</div>
          </Button>
        </div>

        <div className='flex items-center mt-4 gap-2'>
          <div className={`mb-auto text-[#39507f] text-[13px] opacity-70`}>
            ESTADO
          </div>

          <div className={`flex flex-row flex-wrap gap-1.5 items-center `}>
            <div className={`flex gap-[1px] my-[2px] w-28 h-4 bg-[#ffffff] text-white rounded-lg opacity-60`}>
              <div className="flex items-center justify-center text-[10px] text-center w-7 bg-[#39507fdd] rounded-l-lg ">
                1
              </div>

              <div className={`flex items-center justify-center text-[10px] text-center w-7 bg-[#39507fdd] `}>
                2
              </div>

              <div className={`flex items-center justify-center text-[10px] text-center w-7 bg-[#548effdd] `}>
                3
              </div>

              <div className={`flex items-center justify-center text-[10px] text-center w-7 text-[#020b1ddd] rounded-r-lg `}>
                4
              </div>
            </div>

            <div className={`flex items-center  `}>
              <div className={`${shimmer} relative overflow-hidden w-36 h-[14px] bg-[#cbd5e1cc] rounded-md flex flex-nowrap items-center `}></div>
              <IconFlecha className="ml-1 w-[12px] opacity-30" />
            </div>
          </div>
        </div>
      </Frente>

      <div className="z-10 my-5 flex w-full justify-center">
        <div className="inline-flex items-center gap-3">
          <IconFlecha className={`w-[14px] scale-[-1] fill-[#39507f30] `} />

            <div className={`${shimmer} relative overflow-hidden flex rounded-[4px] gap-[1px] `}>
              <div className="w-8 h-8 bg-[#cbd5e1] rounded-l-md"></div>
              <div className="w-8 h-8 bg-[#cbd5e188] rounded-r-md"></div>
            </div>

          <IconFlecha className={`w-[14px] fill-[#39507f30] `} />
        </div>
      </div>
    </>
  );
}
export function CommentsSkeleton() {
  return (
    <main className=''>
      <h1 className={` mb-[22px] mt-1.5 text-xl lg:text-2xl`}>
        Mis Comentarios
      </h1>

      <div className='relative '>
        <div className={`flex flex-col mb-3 gap-[2px]`}>
          <Frente className="flex flex-col text-[#020b1dbb] w-full p-3 !bg-[#ffffff44] !rounded-[6px] sm:p-4 ">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center flex-wrap gap-[2px] opacity-60">
                <div className="flex items-center font-medium text-[13px] mr-2 sm:text-sm ">
                  <p>COMENTARIO</p>
                  <p className="bg-[#548effdd] ml-1 px-1 text-[13px] text-[#ffffff] rounded-md">000</p>
                </div>
                <p className="flex flex-nowrap items-center">
                  <span className="text-[14px] mb-0.5">realizado</span>
                  <time className={`${shimmer} before:via-[#39507f21] relative overflow-hidden w-20 h-[17px] text-[#39507f99] leading-[1.2] ml-1 rounded-lg px-1.5 bg-[#ffffffdd] sm:w-[88px] sm:h-[19px]`}></time>
                </p>
              </div> 

              <div className='relative h-[30px] flex items-center gap-0 mb-auto opacity-60'>
                <div className="px-1 mb-auto text-[13px] pb-0.5 border border-[#020b1d2c] text-[#020b1d88] bg-[#ffffff88] rounded-full leading-[1.1]">eliminar</div>
              </div>
            </div>

            <div className="mt-3 mx-2 lg:mx-4">
              <div className={`w-full h-5 `}>
                <div className={`${shimmer} relative overflow-hidden w-full h-[14px] bg-[#cbd5e1] opacity-80 rounded-md mb-1`}></div>
              </div>

              <div className={`w-3/4 h-5`}>
                <div className={`${shimmer} relative overflow-hidden w-full h-[14px] bg-[#cbd5e1] opacity-80 rounded-md mb-1`}></div>
              </div>
            </div>
          </Frente>
        </div>
      </div>

      <div className='relative '>
        <div className={`flex flex-col mb-3 gap-[2px]`}>
          <Frente className="flex flex-col text-[#020b1dbb] w-full p-3 !bg-[#ffffff44] !rounded-[6px] sm:p-4 ">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center flex-wrap gap-[2px] opacity-60">
                <div className="flex items-center font-medium text-[13px] mr-2 sm:text-sm ">
                  <p>COMENTARIO</p>
                  <p className="bg-[#548effdd] ml-1 px-1 text-[13px] text-[#ffffff] rounded-md">000</p>
                </div>
                <p className="flex flex-nowrap items-center">
                  <span className="text-[14px] mb-0.5">realizado</span>
                  <time className={`${shimmer} before:via-[#39507f21] relative overflow-hidden w-20 h-[17px] text-[#39507f99] leading-[1.2] ml-1 rounded-lg px-1.5 bg-[#ffffffdd] sm:w-[88px] sm:h-[19px]`}></time>
                </p>
              </div> 

              <div className='relative h-[30px] flex items-center gap-0 mb-auto opacity-60'>
                <div className="px-1 mb-auto text-[13px] pb-0.5 border border-[#020b1d2c] text-[#020b1d88] bg-[#ffffff88] rounded-full leading-[1.1]">eliminar</div>
              </div>
            </div>

            <div className="mt-3 mx-2 lg:mx-4">
              <div className={`w-full h-5 `}>
                <div className={`${shimmer} relative overflow-hidden w-full h-[14px] bg-[#cbd5e1] opacity-80 rounded-md mb-1`}></div>
              </div>

              <div className={`w-3/4 h-5`}>
                <div className={`${shimmer} relative overflow-hidden w-full h-[14px] bg-[#cbd5e1] opacity-80 rounded-md mb-1`}></div>
              </div>
            </div>
          </Frente>
        </div>
      </div>

      <div className='relative '>
        <div className={`flex flex-col mb-3 gap-[2px]`}>
          <Frente className="flex flex-col text-[#020b1dbb] w-full p-3 !bg-[#ffffff44] !rounded-[6px] sm:p-4 ">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center flex-wrap gap-[2px] opacity-60">
                <div className="flex items-center font-medium text-[13px] mr-2 sm:text-sm ">
                  <p>COMENTARIO</p>
                  <p className="bg-[#548effdd] ml-1 px-1 text-[13px] text-[#ffffff] rounded-md">000</p>
                </div>
                <p className="flex flex-nowrap items-center">
                  <span className="text-[14px] mb-0.5">realizado</span>
                  <time className={`${shimmer} before:via-[#39507f21] relative overflow-hidden w-20 h-[17px] text-[#39507f99] leading-[1.2] ml-1 rounded-lg px-1.5 bg-[#ffffffdd] sm:w-[88px] sm:h-[19px]`}></time>
                </p>
              </div> 

              <div className='relative h-[30px] flex items-center gap-0 mb-auto opacity-60'>
                <div className="px-1 mb-auto text-[13px] pb-0.5 border border-[#020b1d2c] text-[#020b1d88] bg-[#ffffff88] rounded-full leading-[1.1]">eliminar</div>
              </div>
            </div>

            <div className="mt-3 mx-2 lg:mx-4">
              <div className={`w-full h-5 `}>
                <div className={`${shimmer} relative overflow-hidden w-full h-[14px] bg-[#cbd5e1] opacity-80 rounded-md mb-1`}></div>
              </div>

              <div className={`w-3/4 h-5`}>
                <div className={`${shimmer} relative overflow-hidden w-full h-[14px] bg-[#cbd5e1] opacity-80 rounded-md mb-1`}></div>
              </div>
            </div>
          </Frente>
        </div>
      </div>

      <div className="z-10 my-5 flex w-full justify-center">
        <div className="inline-flex items-center gap-3">
          <IconFlecha className={`w-[14px] scale-[-1] fill-[#39507f30] `} />

          <div className={`${shimmer} relative overflow-hidden flex rounded-[4px] gap-[1px] `}>
            <div className="w-8 h-8 bg-[#cbd5e1] rounded-l-md"></div>
            <div className="w-8 h-8 bg-[#cbd5e188] rounded-r-md"></div>
          </div>

          <IconFlecha className={`w-[14px] fill-[#39507f30] `} />
        </div>
      </div>
    </main>
  );
}




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
    <>
      <div className="flex flex-col justify-between">
        <div className="flex p-2 pl-0">
          <div className={`${shimmer} relative overflow-hidden ml-2 w-24 bg-gray-200 rounded-md h-4 sm:h-5`}></div>
          <div className="ml-2 w-4 bg-gray-100 rounded-md"></div>
        </div>
        <div className={`${shimmer} relative overflow-hidden bg-white rounded-xl truncate p-3 text-center sm:p-5`}>
            <div className="flex gap-2 items-center mb-2">
              <div className="w-20 h-5 rounded-md bg-gray-200"></div>
              <div className="w-6 h-5 rounded-md bg-gray-100 flex items-center justify-center px-1 "></div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-[76px] h-5 rounded-md bg-gray-200"></div>
              <div className="w-6 h-5 rounded-md bg-gray-100 flex items-center justify-center px-1 "></div>
            </div>
        </div>
      </div>

      <div className={` flex flex-col justify-between `}>
        <div className="flex p-2 pl-0">
          <div className={`${shimmer} relative overflow-hidden ml-2 w-24 bg-gray-200 rounded-md h-4 sm:h-5`}></div>
          <div className="ml-2 w-4 bg-gray-100 rounded-md"></div>
        </div>
        <div
          className={`${shimmer} relative overflow-hidden bg-white rounded-xl truncate p-3 text-center sm:p-5`}>
            <div className="flex gap-2 items-center mb-2">
              <div className="w-20 h-5 rounded-md bg-gray-200"></div>
              <div className="w-6 h-5 rounded-md bg-gray-100 px-1"></div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-20 h-5 rounded-md bg-gray-200"></div>
              <div className="w-6 h-5 rounded-md bg-gray-100 px-1 "></div>
            </div>
        </div>
      </div>
    </>
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

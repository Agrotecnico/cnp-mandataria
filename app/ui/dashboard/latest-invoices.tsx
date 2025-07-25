import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data'
import { Frente, Fondo } from '@/app/ui/marcos'

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices()

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={` text-[18px] lg:text-[22px] p-2 pl-0`}>
        Últimas facturas
      </h2>{/* ${lusitana.className} */}
      <div className="flex grow flex-col justify-between rounded-xl ">

        <div className="">
          {latestInvoices.map((invoice, i) => {
            return (
              <Frente
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between p-4 bg-[#30032210] mb-1  ',
                  {
                    /* 'border-t': i !== 0, */
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-[#1d021599] sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={` truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>{/* ${lusitana.className} */}
              </Frente>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-0">
          <ArrowPathIcon className="h-5 w-5 text-[#1d021599]" />
          <h3 className="ml-2 text-sm text-[#1d021599] ">Actualizado hace un momento</h3>
        </div>
      </div>
    </div>
  );
}


import { generateYAxis } from '@/app/lib/utils'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { lusitana } from '@/app/ui/fonts'
/* import { Revenue } from '@/app/lib/definitions' */
import { fetchRevenue } from '@/app/lib/data'
import { Frente, Fondo } from '@/app/ui/marcos'

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  const revenue = await fetchRevenue()

  const chartHeight = 350;
  // NOTE: comment in this code when you get to this point in the course
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">Datos no disponibles.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={` p-2 pl-0 text-[18px] lg:text-[22px]`}>
        {/* Recent Revenue */}Ingresos recientes
      </h2>{/* ${lusitana.className} */}
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="">
        <Frente className="bg-[#30032210] !mb-1 mt-0 flex items-end gap-2 p-4 sm:grid-cols-13 md:gap-4 min-[1024px]:[grid-template-columns:_auto_repeat(12,_minmax(0,_1fr))] min-[1024px]:gap-1.5 "> {/* grid grid-cols-12 */}
          <div
            className="mb-6 flex flex-col justify-between text-xs text-[#1d021599] sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>
          <div className=" grid grid-cols-12 w-full items-end gap-2">
          {revenue.map((month) => (
            // <div key={month.month} className="flex flex-col items-center gap-2">
            <div key={month.month} /* className=" grid grid-cols-12 items-center gap-2" */>
              <div
                className="w-full mb-2 rounded-t-md bg-[#ff8fe7db]"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="w-6 -rotate-90 text-xs text-[#1d021599] sm:rotate-0 min-[1024px]:-rotate-90 min-[1024px]:text-xs">
                {month.month}
              </p>
            </div>
          ))}</div>
        </Frente>
        <div className="flex items-center pb-2 pt-2">
          <CalendarIcon className="h-5 w-5 text-[#50073a99]" />
          <h3 className="ml-2 text-sm text-[#1d021599] ">Últimos 12 meses</h3>
        </div>
      </div>
    </div>
  );
}


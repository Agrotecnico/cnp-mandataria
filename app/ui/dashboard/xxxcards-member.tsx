import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline'
import { fetchCardDataMember } from '@/app/lib/data'
import { Frente, Fondo } from '@/app/ui/marcos'
import { auth } from '@/auth'
import { fetchUserById } from '@/app/lib/data';


const iconMap = {
  // collected: BanknotesIcon,
  consultas: UserGroupIcon,
  // pending: ClockIcon,
  tramites: InboxIcon,
};

export default async function CardWrapperMember() {
  const session = await auth()
  const user = await fetchUserById(session?.user?.email)
  const email:string = `${user?.email}`
  const {
    numberOfConsultas,
    numberOfTramites,
    // totalPaidInvoices,
    // totalPendingInvoices,
  } = await fetchCardDataMember(email);
  return (
    <>
      {/* <Card title="Cobradas" value={totalPaidInvoices} type="collected" />
      <Card title="Pendientes" value={totalPendingInvoices} type="pending" /> */}
      <CardMember title="Total consultas" value={numberOfConsultas} type="consultas" />
      <CardMember title="Total trámites" value={numberOfTramites} type="tramites"/>
    </>
  );
}

export function CardMember({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'consultas' | 'tramites' /* | 'pending' | 'collected' */;
}) {
  const Icon = iconMap[type];

  return (
    <div className="flex flex-col justify-between ">
      <div className="flex p-2 pl-0">
        {Icon ? <Icon className="h-5 w-[18px] text-[#50073aaa]" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <Frente
        className={`
          truncate p-8 text-center text-lg bg-[#30032210] sm:text-xl sm:py-8`}
      >
        {value}
      </Frente>
    </div>
  );
}

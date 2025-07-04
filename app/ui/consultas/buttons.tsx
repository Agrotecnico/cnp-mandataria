import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { deleteConsulta } from '@/app/lib/actions';


export function UpdateConsulta({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/consultas/${id}/edit`}
      className="rounded-md w-[38px] duration-150 p-2 opacity-70 bg-[#ffffff99] hover:opacity-100 hover:bg-[#ffffffbb] "
    >
      <PencilIcon className="w-5 text-[#2c3c8a]" />
    </Link>
  );
}

export function DeleteConsulta({ id }: { id: string }) {
  const deleteConsultaWithId = deleteConsulta.bind(null, id);

  return (
    <form action={deleteConsultaWithId}>
      <button className="rounded-md p-2 opacity-80 bg-[#ffffff55] hover:opacity-100 hover:bg-[#ffffff77] ">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-[#b53f51]" />
      </button>
    </form>
  );
}



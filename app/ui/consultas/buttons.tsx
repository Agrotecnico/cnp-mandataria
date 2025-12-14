import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { deleteConsulta } from '@/app/lib/actions';


export function UpdateConsulta({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/consultas/${id}/edit`}
      className="group rounded-md w-[38px] duration-150 p-2 bg-[#ffffffbb] hover:bg-[#ffffff] "
    >
      <PencilIcon className="w-5 text-[#020b1daa] group-hover:text-[#020b1d]" />
    </Link>
  );
}

export function DeleteConsulta({ id }: { id: string }) {
  const deleteConsultaWithId = deleteConsulta.bind(null, id);

  return (
    <form action={deleteConsultaWithId}>
      <button className="group rounded-md p-2 bg-[#ffffffbb]  hover:bg-[#ffffff]">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-[#b53f51aa] group-hover:text-[#b53f51]" />
      </button>
    </form>
  );
}



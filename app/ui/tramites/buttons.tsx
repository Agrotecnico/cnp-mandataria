import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteTramite } from '@/app/lib/actions';

export function UpdateTramite({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/tramites/${id}/edit`}
      className="group rounded-md w-[38px] p-2 bg-[#ffffffbb] hover:bg-[#ffffff] "
    >
      <PencilIcon className="w-5 text-[#020b1d88] group-hover:text-[#020b1d]" />
    </Link>
  );
}

export function DeleteTramite({ id }: { id: string }) {
  const deleteTramiteWithId = deleteTramite.bind(null, id);

  return (
    <form action={deleteTramiteWithId}>
      <button className="rounded-md p-2 opacity-80 bg-[#ffffff55] hover:opacity-100 hover:bg-[#ffffff77] ">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-[#b53f51]" />
      </button>
    </form>
  );
}

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteComment } from '@/app/lib/actions';

export function UpdateComment({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/tramites/${id}/edit`}
      className="group rounded-md w-[38px] p-2 bg-[#ffffff]  "
    >
      <PencilIcon className="w-5 text-[#020b1d88] group-hover:text-[#020b1d]" />
    </Link>
  );
}

export function DeleteComment({ id }: { id: string }) {
  const deleteCommentWithId = deleteComment.bind(null, id);

  return (
    <form action={deleteCommentWithId}>
      <button className="rounded-md p-2 opacity-80 bg-[#ffffff55] hover:opacity-100 hover:bg-[#ffffff77] ">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-[#b53f51]" />
      </button>
    </form>
  );
}

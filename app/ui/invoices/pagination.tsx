'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { generatePagination } from '@/app/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'
import IconFlecha from '@/app/ui/logosIconos/icon-flecha'

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  // NOTE: comment in this code when you get to this point in the course

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="inline-flex items-center">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex space-x-[1px] rounded-md py-[1px] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e]">{/* -space-x-px gap-[1px] */}
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-8 w-8 items-center justify-center text-sm hover:bg-[#ffffffe3] gap-[1px]',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-[#ffffff] text-[#020b1dcc]': isActive,
      'bg-[#ffffff88] text-[#020b1d88] hover:text-[#020b1d] hover:bg-[#ffffff]': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'group flex w-10 h-8 items-center justify-center rounded-md border',
    {
      'pointer-events-none ': isDisabled,
      // 'hover:bg-[#ffffff88]': !isDisabled,
      'pr-4 ': direction === 'left',
      'pl-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <IconFlecha className={`w-[14px] scale-[-1]  ${isDisabled ? "fill-[#39507f30]" : " fill-[#39507faa] group-hover:fill-[#39507f]"} `} />
    ) : (
      <IconFlecha className={`w-[14px] ${isDisabled ? "fill-[#39507f30]" : "fill-[#39507faa]  group-hover:fill-[#39507f]"} `} />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

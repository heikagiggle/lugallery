'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type Props = {
  totalItems: number;
  totalPages: number;
};

export function Pagination(props: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const page = Number(searchParams.get('page')) || 0;
  const size = Number(searchParams.get('size')) || 10;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());

    const pageRoute = `${pathname}?${params.toString()}`;
    replace(pageRoute);
  };

  return (
    <div className="py-4 px-5 flex items-center justify-between mt-auto">
      <p className="text-[#5F5F61] text-xs whitespace-nowrap">
        Showing {`${page * size + 1} - ${page * size + size}`} of{' '}
        <b className="text-dark-100">{props.totalItems}</b> items
      </p>
      <UIPagination className="ml-auto mr-0 w-auto">
        <PaginationContent>
          {page > 0 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => goToPage(page - 1)}>
                Previous
              </PaginationPrevious>
            </PaginationItem>
          )}

          {page < props.totalPages - 1 && (
            <PaginationItem>
              <PaginationNext onClick={() => goToPage(page + 1)}>
                Next
              </PaginationNext>
            </PaginationItem>
          )}
        </PaginationContent>
      </UIPagination>
    </div>
  );
}
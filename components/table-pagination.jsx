"use client"

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export default function TablePagination({currentPage, totalPages}) {
  const nextPage = currentPage + 1;
  const previousPage = currentPage - 1;

  const searchParams = useSearchParams();
  
  // Helper function to build URL with all existing params
  const buildUrl = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    return `?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        
        <PaginationItem className={`${currentPage <= 1 ? 'hidden' : ''}`}>
          <PaginationPrevious href={buildUrl(previousPage)} />
        </PaginationItem>

        <div className={`${previousPage <= 1 || currentPage <= 1 ? 'hidden' : 'inline-flex'}`}>
          <PaginationItem>
            <PaginationLink href={buildUrl(1)}>{1}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis/>
          </PaginationItem>
        </div>

        <PaginationItem className={previousPage > 0 ? '' : 'hidden'}>
          <PaginationLink href={buildUrl(previousPage)}>{previousPage}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href={buildUrl(currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem className={nextPage <= totalPages ? '' : 'hidden'}>
          <PaginationLink href={buildUrl(nextPage)}>{nextPage}</PaginationLink>
        </PaginationItem>

        <div className={`${nextPage >= totalPages || currentPage >= totalPages ? 'hidden' : 'inline-flex'}`}>
          <PaginationItem>
            <PaginationEllipsis/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={buildUrl(totalPages)}>{totalPages}</PaginationLink>
          </PaginationItem>
        </div>

        <PaginationItem className={`${currentPage >= totalPages ? 'hidden' : ''}`}>
          <PaginationNext href={buildUrl(nextPage)} />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination(props: {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onChangePage: any;
}) {
  const { currentPage, totalItems, totalPages, itemsPerPage, onChangePage } =
    props;
  const offset = +currentPage * +itemsPerPage - +itemsPerPage;

  const getClass = (page: number) => {
    if (page === currentPage) {
      return 'relative z-10 inline-flex items-center bg-amber-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500';
    } else {
      return 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0';
    }
  };

  const Indexes = () => {
    let element: any = [];
    for (let i = 1; i <= totalPages; i += 1) {
      element = [
        ...element,
        <a
          key={i}
          href='#'
          aria-current='page'
          className={getClass(i)}
          onClick={() => onChangePage(i)}
        >
          {i}
        </a>,
      ];
    }
    return element;
  };

  const SimplePagination = () => {
    return Indexes();
  };

  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-zinc-100 px-4 py-3 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <a
          href='#'
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Previous
        </a>
        <a
          href='#'
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Next
        </a>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>{offset + 1}</span> to{' '}
            <span className='font-medium'>{+offset + +itemsPerPage}</span> of{' '}
            <span className='font-medium'>{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <a
              href='#'
              className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              onClick={() => onChangePage(+currentPage - 1)}
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeft className='h-5 w-5' aria-hidden='true' />
            </a>
            {/* Current: "z-10 bg-amber-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <SimplePagination />
            <a
              href='#'
              className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              onClick={() => onChangePage(+currentPage + 1)}
            >
              <span className='sr-only'>Next</span>
              <ChevronRight className='h-5 w-5' aria-hidden='true' />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

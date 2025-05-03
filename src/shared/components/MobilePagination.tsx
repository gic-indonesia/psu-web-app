/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function MobilePagination(props: {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onChangePage: (i: number) => void;
}) {
  const { currentPage, totalItems, totalPages, itemsPerPage, onChangePage } =
    props;
  const offset = +currentPage * +itemsPerPage - +itemsPerPage;

  const isPaginated = () => {
    return totalPages > 1;
  };

  const isFullyPaginated = () => {
    return totalPages > 2 * 2;
  };

  const isOnFirstPage = () => {
    return currentPage === 1;
  };

  const isOnLastPage = () => {
    return currentPage === totalPages;
  };

  const isOnLeft = () => {
    return currentPage && currentPage <= 2 && currentPage < totalPages - 2;
  };

  const isOnMiddle = () => {
    return currentPage && currentPage > 2 && currentPage <= totalPages - 2;
  };

  const isOnRight = () => {
    return currentPage && currentPage > 2 && currentPage > totalPages - 2;
  };

  const getClass = (page: number) => {
    if (page === currentPage) {
      return 'relative z-10 text-[8pt] inline-flex items-center bg-amber-600 px-3 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600';
    } else {
      return 'relative bg-white inline-flex text-[8pt] items-center px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0';
    }
  };

  const Indexes = (limit: number = totalPages) => {
    let element: any = [];
    for (let i = 1; i <= limit; i += 1) {
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
    return Indexes(totalPages);
  };

  const LeftSide = () => {
    let element: any = [];
    if (isOnLeft()) {
      const simplePaginate = Indexes(2 + 1);
      element = [...element, simplePaginate];
    }
    if (isOnMiddle() || isOnRight()) {
      element = [
        ...element,
        <a
          key={1}
          href='#'
          aria-current='page'
          className={getClass(1)}
          onClick={() => onChangePage(1)}
        >
          1
        </a>,
      ];
    }
    return element;
  };

  const MiddleSide = () => {
    let element: any = [];
    if (isOnLeft() || isOnRight()) {
      element = [
        ...element,
        <a
          key='middleSide'
          href='#'
          className='pointer-events-none relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'
          aria-current='page'
        >
          ...
        </a>,
      ];
    }
    if (isOnMiddle()) {
      element = [
        ...element,
        <a
          key='leftCurrent'
          href='#'
          className='pointer-events-none relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'
          aria-current='page'
        >
          ...
        </a>,
        <a
          key={`page-${currentPage - 1}`}
          href='#'
          aria-current='page'
          className={getClass(currentPage - 1)}
          onClick={() => onChangePage(currentPage - 1)}
        >
          {currentPage - 1}
        </a>,
        <a
          key={`page-${currentPage}`}
          href='#'
          aria-current='page'
          className={getClass(currentPage)}
          onClick={() => onChangePage(currentPage)}
        >
          {currentPage}
        </a>,
        <a
          key={`page-${currentPage + 1}`}
          href='#'
          aria-current='page'
          className={getClass(currentPage + 1)}
          onClick={() => onChangePage(currentPage + 1)}
        >
          {currentPage + 1}
        </a>,
        <a
          key='rightCurrent'
          href='#'
          className='pointer-events-none relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'
          aria-current='page'
        >
          ...
        </a>,
      ];
    }
    return element;
  };

  const RightSide = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let element: any = [];
    if (isOnLeft() || isOnMiddle()) {
      element = [
        ...element,
        <a
          key={totalPages}
          href='#'
          aria-current='page'
          className={getClass(totalPages)}
          onClick={() => onChangePage(totalPages)}
        >
          {totalPages}
        </a>,
      ];
    }
    if (isOnRight()) {
      for (let i = totalPages - 2; i <= totalPages; i++) {
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
    }
    return element;
  };

  return (
    <div className='flex items-center border-t border-gray-200 px-2 py-3 sm:px-6'>
      <div className='flex flex-1 items-center justify-between'>
        <div>
          <p className='text-[8pt] text-gray-700'>
            Showing <span className='font-medium'>{offset + 1}</span> to{' '}
            <span className='font-medium'>{+offset + +itemsPerPage}</span> of{' '}
            <span className='font-medium'>{totalItems}</span> results
          </p>
        </div>
        <div>
          {isPaginated() && (
            <nav
              className='isolate inline-flex -space-x-px rounded-md shadow-sm'
              aria-label='Pagination'
            >
              {!isOnFirstPage() && (
                <a
                  href='#'
                  className='relative bg-white inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  onClick={() => onChangePage(+currentPage - 1)}
                >
                  <span className='sr-only'>Previous</span>
                  <ChevronLeftIcon className='h-5 w-4' aria-hidden='true' />
                </a>
              )}
              {!isFullyPaginated() && <SimplePagination />}
              {isFullyPaginated() && (
                <>
                  <LeftSide />
                  <MiddleSide />
                  <RightSide />
                </>
              )}
              {!isOnLastPage() && (
                <a
                  href='#'
                  className='relative bg-white inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  onClick={() => onChangePage(+currentPage + 1)}
                >
                  <span className='sr-only'>Next</span>
                  <ChevronRightIcon className='h-5 w-4' aria-hidden='true' />
                </a>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

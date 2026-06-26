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

  const baseClass =
    'relative inline-flex min-h-[40px] min-w-[40px] items-center justify-center px-3 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0';

  const getClass = (page: number) => {
    if (page === currentPage) {
      return `${baseClass} z-10 bg-amber-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600`;
    } else {
      return `${baseClass} bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50`;
    }
  };

  const PageButton = (props: { page: number }) => {
    const { page } = props;
    return (
      <button
        type="button"
        aria-current={page === currentPage ? 'page' : undefined}
        className={getClass(page)}
        onClick={() => onChangePage(page)}
      >
        {page}
      </button>
    );
  };

  const Ellipsis = () => (
    <span
      className="pointer-events-none relative inline-flex min-h-[40px] items-center px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300"
    >
      ...
    </span>
  );

  const Indexes = (limit: number = totalPages) => {
    const element: any = [];
    for (let i = 1; i <= limit; i += 1) {
      element.push(<PageButton key={i} page={i} />);
    }
    return element;
  };

  const SimplePagination = () => {
    return Indexes(totalPages);
  };

  const LeftSide = () => {
    let element: any = [];
    if (isOnLeft()) {
      element = [...element, ...Indexes(2 + 1)];
    }
    if (isOnMiddle() || isOnRight()) {
      element = [...element, <PageButton key={1} page={1} />];
    }
    return element;
  };

  const MiddleSide = () => {
    let element: any = [];
    if (isOnLeft() || isOnRight()) {
      element = [...element, <Ellipsis key="middleSide" />];
    }
    if (isOnMiddle()) {
      element = [
        ...element,
        <Ellipsis key="leftCurrent" />,
        <PageButton key={`page-${currentPage - 1}`} page={currentPage - 1} />,
        <PageButton key={`page-${currentPage}`} page={currentPage} />,
        <PageButton key={`page-${currentPage + 1}`} page={currentPage + 1} />,
        <Ellipsis key="rightCurrent" />,
      ];
    }
    return element;
  };

  const RightSide = () => {
    let element: any = [];
    if (isOnLeft() || isOnMiddle()) {
      element = [...element, <PageButton key={totalPages} page={totalPages} />];
    }
    if (isOnRight()) {
      for (let i = totalPages - 2; i <= totalPages; i++) {
        element = [...element, <PageButton key={i} page={i} />];
      }
    }
    return element;
  };

  return (
    <div className='flex w-full items-center justify-between gap-2 border-t border-gray-200 px-2 py-3'>
      <p className='shrink-0 text-xs text-gray-700'>
        <span className='font-medium'>{offset + 1}</span>-
        <span className='font-medium'>{+offset + +itemsPerPage}</span> / {' '}
        <span className='font-medium'>{totalItems}</span>
      </p>
      {isPaginated() && (
        <nav
          className='isolate inline-flex max-w-full -space-x-px overflow-x-auto rounded-md shadow-sm'
          aria-label='Pagination'
        >
          {!isOnFirstPage() && (
            <button
              type='button'
              className='relative inline-flex min-h-[40px] items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              onClick={() => onChangePage(+currentPage - 1)}
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
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
            <button
              type='button'
              className='relative inline-flex min-h-[40px] items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              onClick={() => onChangePage(+currentPage + 1)}
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          )}
        </nav>
      )}
    </div>
  );
}

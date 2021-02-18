import { URLWrapper } from 'Services/URLWrapper';

type CalculatePagesParams = {
  totalItems: number;
  itemsPerPage: number;
  path: string;
  offset: number;
  pageNeighbours: number;
};

type CalculatePagesReturn = Array<{ page: number; path: string; current: boolean } | null>;

export const calculatePages = ({
  totalItems,
  itemsPerPage,
  path,
  offset,
  pageNeighbours,
}: CalculatePagesParams): CalculatePagesReturn => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const firstPage = 1;
  const isOnePage = totalPages === 1;
  const currentPage = offset > totalItems ? Math.ceil(totalItems / itemsPerPage) : Math.ceil(offset / itemsPerPage) + 1;

  const defaultPages = [
    {
      page: 1,
      path: path,
      current: true,
    },
  ];

  if (!totalItems || isOnePage) return defaultPages;

  const pages = Array.from({ length: totalPages }, (_, index) => ({ page: firstPage + index }))
    .map((item, index, array) => {
      const currentPageOffset = item.page * itemsPerPage - itemsPerPage;
      const isNotFirstPage = item.page > 1;
      const isNotLastPage = item.page < totalPages;
      const isNotNeighbour = item.page < currentPage - pageNeighbours || item.page > currentPage + pageNeighbours;
      const offsetExceedesCalculatedPages = !!offset && Math.ceil(itemsPerPage / offset) >= array.length;
      const isLastPage = index + 1 === array.length;
      const isCurrent = item.page === currentPage || (offsetExceedesCalculatedPages && isLastPage);

      if (isNotFirstPage && isNotLastPage && isNotNeighbour) return null;

      const myUrl = new URLWrapper(path);
      isNotFirstPage
        ? myUrl.upsertSearchParam('page[offset]', currentPageOffset)
        : myUrl.deleteSearchParam('page[offset]');
      const pathWithCurrentOffSet = myUrl.getPathAndSearch();

      const page = {
        page: item.page,
        path: pathWithCurrentOffSet,
        current: isCurrent,
      };

      return page;
    })
    .filter((item, index, array) => !!(item !== array[index - 1]));

  return pages;
};

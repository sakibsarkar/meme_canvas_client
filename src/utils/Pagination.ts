export interface PaginationResult<T> {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    paginatedItems: T[];
}

export const paginate = <T>(
    items: T[],
    currentPage: number,
    itemsPerPage: number
): PaginationResult<T> => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    return {
        currentPage,
        itemsPerPage,
        totalItems: items.length,
        totalPages,
        paginatedItems,
    };
};
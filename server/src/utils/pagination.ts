export interface PaginatedResult<T> {
  data: T[]
  meta: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export function paginationParams(
  page: string | number = 1,
  pageSize: string | number = 20,
): { from: number; to: number; page: number; pageSize: number } {
  const p = Math.max(1, Number(page))
  const ps = Math.min(100, Math.max(1, Number(pageSize)))
  return {
    page: p,
    pageSize: ps,
    from: (p - 1) * ps,
    to: p * ps - 1,
  }
}

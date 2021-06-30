export class PaginatedData <T> {
  items?: T[];
  meta: Meta = new Meta();
  links:Links = new Links();
}
export class Links{
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
}
export class Meta {
    totalItems?: number;
    itemCount?: number;
    itemsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
}
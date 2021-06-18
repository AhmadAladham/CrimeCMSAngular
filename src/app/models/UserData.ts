import { User } from "./user";

export class UserData {
  items?: User[];
  meta: Meta = new Meta();
  links:Links = new Links();
};

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
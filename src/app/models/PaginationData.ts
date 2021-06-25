import { Crime } from "./Crimes";
import { Criminal } from "./Criminal";
import { User } from "./user";

export class UserData {
  items?: User[];
  meta: Meta = new Meta();
  links:Links = new Links();
};

export class CriminalsData{
  items?: Criminal[];
  meta: Meta = new Meta();
  links:Links = new Links();
}

export class CrimeData {
  items?: Crime[];
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
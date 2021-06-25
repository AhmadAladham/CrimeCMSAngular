export class CrimeSearch{
    crimeTitle?:string;
    dateFrom?:Date;
    dateTo?:Date;
    location?:string;
    crimeCategoryId?:number;
    stationId?:number;
    pageNumber?:number;
    pageSize?:number;
    sortingColumn?:string;
    sortType?:string;
}

export class UserSearch{
    roleId?:number;
    phoneNumber?:string;
    firstName?:string;
    pageNumber?:number;
    pageSize?:number;
    sortingColumn?:string;
    sortType?:string;
}
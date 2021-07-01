export abstract class SearchParams{
    pageNumber?:number;
    pageSize?:number;
    sortingColumn?:string;
    sortType?:string;
}
export class CrimeSearch extends SearchParams{
    crimeTitle?:string;
    dateFrom?:Date;
    dateTo?:Date;
    location?:string;
    crimeCategoryId?:number;
    stationId?:number;
}

export class UserSearch extends SearchParams{
    roleId?:number;
    phoneNumber?:string;
    firstName?:string;
}
export class CriminalSearch extends SearchParams{
    criminalName?:string;
    heightFrom?:number;
    heightTo?:number;
    weightFrom?:number;
    weightTo?:number;
}

export class ComplaintSearch extends SearchParams{
    ComplaintTitle?:string;
    dateFrom?:Date;
    dateTo?:Date;
    ComplaintStatus?:number;
    crimeCategoryId?:number;
    stationId?:number;   
}
export class Crime {
    CrimeId : number | undefined;
    CrimeCategoryId : number | undefined;
    StationId : number | undefined;
    CrimeTtile: string | undefined;
    CrimeEntryDate : Date | undefined;
    CrimeDate? : Date | undefined;
    CloseDate: Date | undefined;
    IsClosed  : boolean | undefined;
    CrimeDescription : string | undefined;
    Location: string | undefined;  
    CrimeCategoryName: string | undefined;
    CriminalFirstName: string | undefined;
    CriminalLastName: string | undefined;
    StationName: string | undefined;
    Image : string | undefined;
}
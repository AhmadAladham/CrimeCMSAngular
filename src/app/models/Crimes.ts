export class Crime {
    crimeId : number | undefined;
    crimeCategoryId : number | undefined;
    stationId : number | undefined;
    crimeTtile: string | undefined;
    crimeEntryDate : Date | undefined;
    crimeDate : Date | undefined;
    closeDate: Date | undefined;
    isClosed  : boolean | undefined;
    crimeDescription : string | undefined;
    criminalDescription : string | undefined;
    location: string | undefined;  
    crimeCategoryName: string | undefined;
    criminalFirstName: string | undefined;
    criminalLastName: string | undefined;
    stationName: string | undefined;
    image? : string | ArrayBuffer| null;
    criminalId?:number;
}
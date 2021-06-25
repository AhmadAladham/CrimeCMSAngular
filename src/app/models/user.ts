export interface IUser {
    name: string;
    password: string;
}
export class User {
    UserId : number | undefined;
    RoleId:number| undefined;
    Email : string | undefined ;
    FirstName : string | undefined;
    LastName : string | undefined;
    RoleName : string | undefined;
    PhoneNumber : string | undefined;
    DateOfBirth : Date | undefined;
    Gender : string | undefined;
    EmailIsConfirmed : boolean | undefined;
    name: string | undefined;
    password: string | undefined
}


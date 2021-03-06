import { Crime } from "./Crimes";

export class Criminal {
    criminalId?: number;
    criminalNationalNumber?: string;
    criminalFirstName?: string;
    criminalLastName?: string;
    height?: number;
    weight?: number;
    image?: string | ArrayBuffer | undefined | null;
    phoneNumber?: string;
    dateOfBirth?: Date;
    address?: string;
    crimes: Crime[] = [];
}
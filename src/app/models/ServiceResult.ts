export class ServiceResult{
    data : any;
    isSucceed: boolean | undefined;
    status: string | undefined;
    errors: string [] | undefined;
    hasErrors: boolean | undefined;
    headers : any;
}
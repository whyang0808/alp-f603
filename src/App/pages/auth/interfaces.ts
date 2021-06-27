export interface SubmitValues {
    birthDate?: moment.Moment;
    email?: string;
    firstName?: string;
    lastName?: string;
    idNumber?: string;
    idType?: string;
    password?: string;
    newPassword?: string;
}

export interface CompanySubmitValues {
    name: string;
    registrationId: string;
}

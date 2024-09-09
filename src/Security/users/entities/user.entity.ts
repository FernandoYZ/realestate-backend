import { Gender } from "src/enums/gender.enum";
import { Status } from "src/enums/status.enum";

export class UserEntity {
    name: string;
    lastname: string;
    identity_document: number;
    access: string[];
    gender: Gender;
    telephone_number: number;
    email: string;
    password: string;
    status: Status;

    constructor(name: string, lastname: string, identity_document: number, access: string[], gender: Gender, telephone_number: number,  email: string, password: string, status: Status) {
        this.name = name;
        this.lastname = lastname;
        this.identity_document = identity_document;
        this.access = access;
        this.gender = gender;
        this.telephone_number = telephone_number;
        this.email = email;
        this.password = password;
        this.status = status;
    }
}
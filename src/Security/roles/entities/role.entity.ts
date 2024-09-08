import { Status } from "src/enums/status.enum";

export class RoleEntity {
    name: string;
    description?: string;
    status: Status;

    constructor(name:string, status:Status, description?:string) {
        this.name = name;
        this.description = description;
        this.status = status;
    }
}

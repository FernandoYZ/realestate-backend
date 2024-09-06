import { Status } from "../../../enums/status.enum";

export class PermissionEntity {
    module: string;
    description?: string;
    status: Status;

    constructor(module: string, status: Status, description?: string) {
        this.module = module;
        this.description = description;
        this.status = status;
    }
}

import { Status } from "../../../enums/status.enum";

export class PermissionEntity {
    module: string;
    submodule: string;
    description?: string;
    status: Status;

    constructor(module: string, submodule:string, status: Status, description?: string) {
        this.module = module;
        this.submodule = submodule,
        this.description = description;
        this.status = status;
    }
}

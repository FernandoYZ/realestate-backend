import { Status } from "src/enums/status.enum";
import { Actions } from "src/enums/actions.enum";

export class AccessEntity {
    role: string;
    permissions: string[];
    actions: Actions[];
    status: Status;

    constructor(role: string, permissions: string[], actions: Actions[], status: Status) {
        this.role = role;
        this.permissions = permissions;
        this.actions = actions;
        this.status = status;
    }
}

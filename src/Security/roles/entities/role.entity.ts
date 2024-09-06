import { Actions } from "src/enums/actions.enum";
import { Status } from "src/enums/status.enum";

export class RoleEntity {
    name: string;
    description?: string;
    actions: Actions;
    status: Status;

    constructor(name:string, actions:Actions,status:Status, description?:string) {
        this.name = name;
        this.description = description;
        this.actions = actions;
        this.status = status;
    }
}

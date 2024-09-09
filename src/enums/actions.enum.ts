import { IsOptional } from "class-validator";

export enum Actions {
    isCreate = "Agregar",
    isRead = "Ver",
    isUpdate = "Actualizar",
    isDelete = "Eliminar" 
}

export class ActionsBoolean {
    isView: boolean;    
    isEdit: boolean;    
    isDelete: boolean;  
    isCreate: boolean;  

    constructor(isView: boolean, isEdit: boolean, isDelete: boolean, isCreate: boolean) {
        this.isView = isView;    
        this.isEdit = isEdit;    
        this.isDelete = isDelete;  
        this.isCreate = isCreate;  
    }
}

export class ActionsDto {
    @IsOptional()
    readonly isView?: boolean;    

    @IsOptional()
    readonly isEdit?: boolean;    

    @IsOptional()
    readonly isDelete?: boolean;  

    @IsOptional()
    readonly isCreate?: boolean;  
}

import { IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested, IsEnum } from "class-validator";
import { Type } from "class-transformer";

class Submodule {
    @IsNotEmpty()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export enum Status {
    disabled = "Desactivado",
    activated = "Activado",
    pending = "Pendiente",
    deleted = "Eliminado"
}

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @IsOptional()
    readonly description?: string;
    
    @IsString()
    @IsNotEmpty()
    readonly module: string;

    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => Submodule) 
    readonly submodules: Submodule[];

    @IsEnum(Status)
    @IsNotEmpty()
    readonly status: Status;
}
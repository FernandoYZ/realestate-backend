import { IsNotEmpty, IsString, IsOptional, IsEnum, Length, Matches } from "class-validator";
import { Status } from "../../../enums/status.enum";

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 50, { message: 'El módulo debe tener como máximo 50 caracteres.' })
    @Matches(/^[a-zA-Z\s]+$/, { message: 'El módulo solo puede contener letras y espacios, sin números.' })
    readonly module: string;
    
    @IsString()
    @IsOptional()
    @Length(0, 250, { message: 'La descripción debe tener como máximo 250 caracteres.' })
    readonly description?: string;
    
    @IsEnum(Status)
    @IsOptional()
    readonly status: Status;
}

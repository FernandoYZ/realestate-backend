import { IsNotEmpty, IsString, IsOptional, IsEnum, Length, Matches } from "class-validator";
import { Status } from "../../../enums/status.enum";

export class CreatePermissionDto {
    @IsString({ message: 'El módulo debe contener solo letras' })
    @IsNotEmpty({ message: 'El módulo no debe estar vacío' })
    @Length(3, 50, { message: 'El módulo debe tener como máximo 50 caracteres.' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/, { message: 'El módulo solo puede contener letras y espacios, sin números.' })
    readonly module: string;

    @IsString({ message: 'El submódulo debe contener solo letras' })
    @IsNotEmpty({ message: 'El submódulo no debe estar vacío' })
    @Length(3,50, { message: 'El submódulo debe contener como máximo 50 caracteres.' })
    readonly submodule: string;
    
    @IsString()
    @IsOptional()
    @Length(0, 250, { message: 'La descripción debe tener como máximo 250 caracteres.' })
    readonly description?: string;
    
    @IsEnum(Status)
    @IsOptional()
    readonly status: Status;
}

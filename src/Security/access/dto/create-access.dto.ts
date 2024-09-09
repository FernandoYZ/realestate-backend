import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ArrayMinSize, ValidateNested, ArrayUnique, MaxLength } from "class-validator";
import { Schema as MongooseSchema } from "mongoose";
import { Type } from "class-transformer";
import { Status } from "src/enums/status.enum";
import { Actions, ActionsDto } from "src/enums/actions.enum";

export class CreateAccessDto {
    @IsOptional()
    @MaxLength(255, {message: "El campo debe tener como máximo 255 caracteres"})
    readonly description?: string;

    @IsString({ message: "El acceso debe contener solo letras" })
    @IsNotEmpty({ message: "El acceso a crear no debe estar vacío" })
    readonly role: string;
  
    @IsArray()
    @IsNotEmpty({ message: "Los permisos no deben estar vacíos" })
    @ArrayMinSize(1, { message: "Debe haber al menos un permiso asociado" })
    @ArrayUnique({ message: "No se pueden duplicar permisos" })
    readonly permissions: MongooseSchema.Types.ObjectId[];
  
    @IsArray()
    @IsEnum(Actions, { each: true, message: 'Acción inválida' })
    @IsOptional()
    @ArrayUnique({ message: 'No se pueden duplicar acciones' })
    readonly actions?: Actions[];
  
    @IsEnum(Status)
    @IsOptional()
    readonly status?: Status;
  }

import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Actions } from "src/enums/actions.enum";
import { Status } from "src/enums/status.enum";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 50, { message: "El nombre debe tener como máximo 50 caracteres"})
    readonly name: string;

    @IsString()
    @IsOptional()
    @Length(0, 250)
    readonly description?: string;

    @IsEnum(Status)
    @IsOptional()
    readonly status?: Status;
}

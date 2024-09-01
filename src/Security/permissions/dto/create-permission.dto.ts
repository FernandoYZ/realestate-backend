import { IsNotEmpty, IsString, IsOptional, IsEnum } from "class-validator";
import { Status } from "../../../enums/status.enum";

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty()
    readonly module: string;
    
    @IsString()
    @IsOptional()
    readonly description?: string;
    
    @IsEnum(Status)
    @IsNotEmpty()
    readonly status:Status;
}